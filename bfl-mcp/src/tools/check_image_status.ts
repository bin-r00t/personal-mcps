import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig } from "../types/model.js";
import { getResult } from "./get_result.js";
import { pollForResult } from "../helpers/makeRequest.js";

/**
 * Register the check_image_status tool
 */
export function checkImageStatus(server: McpServer, config: BFLConfig) {
  server.tool(
    "check_image_status",
    "Check the status of an image generation task and wait for completion using the polling URL",
    {
      polling_url: z.string().describe("The polling URL returned from the image generation step"),
      timeout: z.number().optional().default(120).describe("Maximum time to wait in seconds (default: 120)"),
    },
    async ({ polling_url, timeout }) => {
      try {
        const maxAttempts = Math.floor(timeout * 1000 / 2000); // Convert timeout to attempts (2s intervals)

        // Use the polling URL instead of task_id
        const response = await pollForResult(polling_url, config.BFL_API_KEY, maxAttempts);

        if (response.error) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error checking image status: ${response.error}`,
              },
            ],
          };
        }

        const result = response.data!;

        // Format the response based on status
        let statusText = "";
        let isComplete = false;

        switch (result.status) {
          case "Ready":
            statusText = "✅ **Generation Complete!**";
            isComplete = true;
            break;
          case "Pending":
            statusText = "⏳ **Generation In Progress**";
            break;
          case "Error":
            statusText = "❌ **Generation Failed**";
            isComplete = true;
            break;
          case "Request Moderated":
            statusText = "🚫 **Request Moderated**";
            isComplete = true;
            break;
          case "Content Moderated":
            statusText = "🚫 **Content Moderated**";
            isComplete = true;
            break;
          case "Task not found":
            statusText = "❓ **Task Not Found**";
            isComplete = true;
            break;
          default:
            statusText = `ℹ️ **Status:** ${result.status}`;
        }

        let responseText = `${statusText}\n\n`;
        responseText += `📋 **Task Information:**\n`;
        responseText += `• Task ID: ${result.id}\n`;
        responseText += `• Status: ${result.status}\n`;

        // Note: In real BFL API responses, progress is typically null
        if (result.progress !== undefined && result.progress !== null) {
          const progressPercent = Math.round(result.progress * 100);
          responseText += `• Progress: ${progressPercent}%\n`;
        }

        if (isComplete && result.result) {
          responseText += `\n📦 **Result Available:**\n`;

          if (typeof result.result === 'object' && result.result.sample) {
            responseText += `• Image URL ready: ${result.result.sample}\n`;
            if (result.result.width) responseText += `• Width: ${result.result.width}px\n`;
            if (result.result.height) responseText += `• Height: ${result.result.height}px\n`;
            if (result.result.content_type) responseText += `• Format: ${result.result.content_type}\n`;
            responseText += `\n💡 **Next Step:** Use the save_image tool with this image URL to download the image`;
          } else {
            responseText += `• Result data: ${JSON.stringify(result.result, null, 2)}`;
          }
        }

        if (result.details && Object.keys(result.details).length > 0) {
          responseText += `\n\n📋 **Details:**\n${JSON.stringify(result.details, null, 2)}`;
        }

        if (result.preview && Object.keys(result.preview).length > 0) {
          responseText += `\n\n👁️ **Preview Available**`;
        }

        if (!isComplete) {
          responseText += `\n\n⏳ **Still Processing...**\n`;
          responseText += `• Use this tool again to continue checking\n`;
          responseText += `• Or use get_result tool for a one-time status check\n`;
          responseText += `• Typical generation time: 10-60 seconds`;
        }

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Error checking image status: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}