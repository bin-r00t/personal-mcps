import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig } from "../types/model.js";
import { writeFileSync, mkdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { sanitizeFilename } from "../helpers/makeRequest.js";

/**
 * Register the save_image tool
 */
export function saveImage(server: McpServer, config: BFLConfig) {
  server.tool(
    "save_image",
    "Download and save a generated image from the image URL returned by get_result()",
    {
      image_url: z.string().describe("The image URL returned by get_result()"),
      filename: z
        .string()
        .optional()
        .describe("Custom filename (without extension)"),
    },
    async ({ image_url, filename }) => {
      try {
        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

        // Actual image_url looks like this: https://delivery-us1.bfl.ai/results/0a/67503159a87d39/59a87d39d576469ca024e2420a824e1b/sample.png?se=2025-10-27T09%3A44%3A35Z&sp=r&sv=2024-11-04&sr=b&rsct=image/png&sig=piesnwWiLVNzLHKwNfMw3M7lTNSrqDn5N%2BwHgK%2BLt2o%3D
        // Extract task ID from BFL CDN image URL: https://delivery-us1.bfl.ai/results/66/752896df5724c7/df5724c7e63b4276922d788dd2fc74ae/sample.jpeg
        const urlParts = image_url.split("?")[0]; // Get https://delivery-us1.bfl.ai/results/0a/67503159a87d39/59a87d39d576469ca024e2420a824e1b/sample.png
        const urlPartsSplit = urlParts.split("/");
        const sampleFile = urlPartsSplit.pop(); // Get "sample.png"
        const taskId =
          urlPartsSplit.length >= 2
            ? urlPartsSplit[urlPartsSplit.length - 2]
            : "unknown"; // Get "59a87d39d576469ca024e2420a824e1b"

        // Extract file extension from the sample file name
        const fileExtension = sampleFile?.split(".").pop() || "jpeg";
        const sanitizedTaskId = sanitizeFilename(taskId);
        const baseFilename = filename || `bfl-${sanitizedTaskId}-${timestamp}`;
        const fullFilename = `${baseFilename}.${fileExtension}`;
        const filepath = join(config.download_path, fullFilename);

        // Ensure download directory exists
        try {
          mkdirSync(dirname(filepath), { recursive: true });
        } catch (error) {
          // Directory might already exist, ignore error
        }

        // Download image directly from image URL (no API key needed)
        try {
          const imageResponse = await fetch(image_url, {
            headers: {
              "x-key": config.BFL_API_KEY,
              "User-Agent": "bfl-mcp/1.0.0",
            },
          });
          if (!imageResponse.ok) {
            throw new Error(
              `Failed to download image: ${imageResponse.statusText}`
            );
          }

          // Check if we got an actual image (MIME type)
          const contentType = imageResponse.headers.get("content-type");
          if (!contentType || !contentType.startsWith("image/")) {
            return {
              content: [
                {
                  type: "text",
                  text: `❌ The polling URL did not return an image. Content type: ${
                    contentType || "unknown"
                  }`,
                },
              ],
            };
          }

          const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
          writeFileSync(filepath, imageBuffer);
        } catch (saveError) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error downloading/saving image: ${
                  saveError instanceof Error
                    ? saveError.message
                    : "Unknown error"
                }`,
              },
            ],
          };
        }

        // Get file size
        const stats = statSync(filepath);
        const fileSizeKB = (stats.size / 1024).toFixed(1);

        let responseText = "💾 **Image Saved Successfully!**\n\n";
        responseText += `✅ Image downloaded from: ${image_url}\n`;
        responseText += `✅ Image saved to: \`${filepath}\`\n\n`;
        responseText += `📋 **File Information:**\n`;
        responseText += `• Filename: ${fullFilename}\n`;
        responseText += `• Format: ${fileExtension.toUpperCase()}\n`;
        responseText += `• File Size: ${fileSizeKB} KB\n`;
        responseText += `• Task ID: ${taskId}\n\n`;
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
              text: `❌ Error saving image: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );
}
