import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig } from "../types/model.js";
import { getRequest } from "../helpers/makeRequest.js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { base64ToBuffer, sanitizeFilename } from "../helpers/makeRequest.js";

/**
 * Register the save_image tool
 */
export function saveImage(server: McpServer, config: BFLConfig) {
  server.tool(
    "save_image",
    "Save a generated image to the download path from a completed task using the polling URL",
    {
      polling_url: z.string().describe("The polling URL returned from the image generation step"),
      filename: z.string().optional().describe("Custom filename (without extension)"),
    },
    async ({ polling_url, filename }) => {
      try {
        // First get the result using the polling URL
        const response = await getRequest(polling_url, config.BFL_API_KEY);

        if (response.error) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error getting result: ${response.error}`,
              },
            ],
          };
        }

        const result = response.data!;

        if (result.status !== "Ready") {
          return {
            content: [
              {
                type: "text",
                text: `❌ Cannot save image: Task is not ready. Current status: ${result.status}`,
              },
            ],
          };
        }

        if (!result.result || typeof result.result !== 'object' || !result.result.sample) {
          return {
            content: [
              {
                type: "text",
                text: "❌ No image data found in the result",
              },
            ],
          };
        }

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sanitizedTaskId = sanitizeFilename(result.id);
        const baseFilename = filename || `bfl-${sanitizedTaskId}-${timestamp}`;

        const imageFormat = result.result.content_type?.includes('png') ? 'png' : 'jpeg';
        const fullFilename = `${baseFilename}.${imageFormat}`;
        const filepath = join(config.download_path, fullFilename);

        // Ensure download directory exists
        try {
          mkdirSync(dirname(filepath), { recursive: true });
        } catch (error) {
          // Directory might already exist, ignore error
        }

        // Convert base64 to buffer and save
        try {
          const imageBuffer = base64ToBuffer(result.result.sample);
          writeFileSync(filepath, imageBuffer);
        } catch (saveError) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error saving image: ${saveError instanceof Error ? saveError.message : "Unknown error"}`,
              },
            ],
          };
        }

        let responseText = "💾 **Image Saved Successfully!**\n\n";
        responseText += `✅ Image saved to: \`${filepath}\`\n\n`;
        responseText += `📋 **File Information:**\n`;
        responseText += `• Filename: ${fullFilename}\n`;
        responseText += `• Format: ${imageFormat.toUpperCase()}\n`;
        responseText += `• Width: ${result.result.width || 'unknown'}px\n`;
        responseText += `• Height: ${result.result.height || 'unknown'}px\n`;
        responseText += `• File Size: ${(Buffer.byteLength(result.result.sample, 'base64') * 3/4 / 1024).toFixed(1)} KB\n\n`;
        responseText += `📂 Download Path: ${config.download_path}`;

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
              text: `❌ Error saving image: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}