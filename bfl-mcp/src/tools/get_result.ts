import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig, ResultResponse } from "../types/model.js";
import { getRequest } from "../helpers/makeRequest.js";

/**
 * Register the get_result tool
 */
export function getResult(server: McpServer, config: BFLConfig) {
  server.tool(
    "get_result",
    "Get the result of an image generation task by using the polling URL from the generation response",
    {
      polling_url: z.string().describe("The polling URL returned from the image generation step"),
    },
    async ({ polling_url }) => {
      try {
        // Use the polling URL directly instead of constructing our own
        const response = await getRequest<ResultResponse>(polling_url, config.BFL_API_KEY);

        if (response.error) { 
          console.error('response ==> ', response)
          return {
            content: [
              {
                type: "text",
                text: `Error getting result: ${response.error}`,
              },
            ],
          };
        }

        const result = response.data!;

        // Format the response based on status
        let statusText = "";
        switch (result.status) {
          case "Ready":
            statusText = "✅ Generation completed successfully";
            break;
          case "Pending":
            statusText = "⏳ Generation in progress";
            break;
          case "Error":
            statusText = "❌ Generation failed";
            break;
          case "Request Moderated":
            statusText = "🚫 Request was moderated";
            break;
          case "Content Moderated":
            statusText = "🚫 Generated content was moderated";
            break;
          case "Task not found":
            statusText = "❓ Task not found";
            break;
          default:
            statusText = `ℹ️ Status: ${result.status}`;
        }

        let responseText = `${statusText}\n\n`;
        responseText += `Task ID: ${result.id}\n`;
        responseText += `Status: ${result.status}\n`;

        if (result.progress !== undefined) {
          responseText += `Progress: ${Math.round(result.progress * 100)}%\n`;
        }

        if (result.result) {
          responseText += `\n📦 Result available!`;

          // If the result contains an image URL
          if (typeof result.result === 'object' && result.result.sample) {
            responseText += `\n- Image URL: ${result.result.sample}`;
            if (result.result.width) responseText += `\n- Width: ${result.result.width}px`;
            if (result.result.height) responseText += `\n- Height: ${result.result.height}px`;
            if (result.result.content_type) responseText += `\n- Format: ${result.result.content_type}`;
            responseText += `\n\n💡 **Next Step:** Copy the image URL above and use it with the save_image tool to download the image`;
          } else {
            responseText += `\n- Result data: ${JSON.stringify(result.result, null, 2)}`;
          }
        }

        // Note: In real BFL API responses, these fields are typically null
        if (result.details && Object.keys(result.details).length > 0) {
          responseText += `\n\n📋 Details:\n${JSON.stringify(result.details, null, 2)}`;
        }

        if (result.preview && Object.keys(result.preview).length > 0) {
          responseText += `\n\n👁️ Preview available:\n${JSON.stringify(result.preview, null, 2)}`;
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
              text: `Error getting result: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}