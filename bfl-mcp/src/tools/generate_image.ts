import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig, FluxDevParams, AsyncResponse, OutputFormat } from "../types/model.js";
import { postRequest } from "../helpers/makeRequest.js";

/**
 * Register the generate_image_dev tool
 */
export function generateImageDev(server: McpServer, config: BFLConfig) {
  server.tool(
    "generate_image_dev",
    "Generate an image using FLUX.1 [dev] model - great for experimentation and fast generation",
    {
      prompt: z.string().describe("Text prompt for image generation"),
      width: z.number().optional().default(1024).describe("Width of the generated image (must be multiple of 32, 256-1440)"),
      height: z.number().optional().default(768).describe("Height of the generated image (must be multiple of 32, 256-1440)"),
      steps: z.number().optional().describe("Number of steps for generation (1-50, default: 28)"),
      guidance: z.number().optional().describe("Guidance scale (1.5-5, default: 3)"),
      seed: z.number().optional().describe("Seed for reproducible generation"),
      prompt_upsampling: z.boolean().optional().default(false).describe("Enable prompt upsampling for more creative results"),
      safety_tolerance: z.number().optional().default(2).describe("Safety tolerance (0-6, 0=strictest, 6=least strict)"),
      output_format: z.enum(["jpeg", "png"]).optional().default("jpeg").describe("Output format for the image"),
      image_prompt: z.string().optional().describe("Optional base64 encoded image to use as additional prompt"),
      webhook_url: z.string().optional().describe("Optional webhook URL for notifications"),
      webhook_secret: z.string().optional().describe("Optional webhook secret for signature verification"),
    },
    async (args) => {
      try {
        // Validate dimensions
        if (args.width! % 32 !== 0 || args.height! % 32 !== 0) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Error: Width and height must be multiples of 32",
              },
            ],
          };
        }

        if (args.width! < 256 || args.width! > 1440 || args.height! < 256 || args.height! > 1440) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Error: Width and height must be between 256 and 1440 pixels",
              },
            ],
          };
        }

        // Validate optional parameters
        if (args.steps !== undefined && (args.steps < 1 || args.steps > 50)) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Error: Steps must be between 1 and 50",
              },
            ],
          };
        }

        if (args.guidance !== undefined && (args.guidance < 1.5 || args.guidance > 5)) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Error: Guidance must be between 1.5 and 5",
              },
            ],
          };
        }

        if (args.safety_tolerance !== undefined && (args.safety_tolerance < 0 || args.safety_tolerance > 6)) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Error: Safety tolerance must be between 0 and 6",
              },
            ],
          };
        }

        // Prepare request parameters
        const params: FluxDevParams = {
          prompt: args.prompt,
          width: args.width,
          height: args.height,
          prompt_upsampling: args.prompt_upsampling,
          safety_tolerance: args.safety_tolerance,
          output_format: args.output_format as OutputFormat,
        };

        // Add optional parameters if provided
        if (args.steps !== undefined) params.steps = args.steps;
        if (args.guidance !== undefined) params.guidance = args.guidance;
        if (args.seed !== undefined) params.seed = args.seed;
        if (args.image_prompt) params.image_prompt = args.image_prompt;
        if (args.webhook_url) params.webhook_url = args.webhook_url;
        if (args.webhook_secret) params.webhook_secret = args.webhook_secret;

        // Make the API request
        const response = await postRequest<AsyncResponse>("/v1/flux-dev", config.BFL_API_KEY, params);

        if (response.error) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error generating image: ${response.error}`,
              },
            ],
          };
        }

        const result = response.data!;

        let responseText = "🎨 **Image Generation Started!**\n\n";
        responseText += `✅ Task submitted successfully\n\n`;
        responseText += `📋 **Generation Details:**\n`;
        responseText += `• Task ID: \`${result.id}\`\n`;
        responseText += `• Model: FLUX.1 [dev]\n`;
        responseText += `• Prompt: "${args.prompt}"\n`;
        responseText += `• Dimensions: ${args.width}×${args.height}\n`;
        responseText += `• Format: ${args.output_format.toUpperCase()}\n`;

        if (args.steps !== undefined) {
          responseText += `• Steps: ${args.steps}\n`;
        }

        if (args.guidance !== undefined) {
          responseText += `• Guidance: ${args.guidance}\n`;
        }

        if (args.seed !== undefined) {
          responseText += `• Seed: ${args.seed}\n`;
        }

        responseText += `• Prompt Upsampling: ${args.prompt_upsampling ? "Enabled" : "Disabled"}\n`;
        responseText += `• Safety Tolerance: ${args.safety_tolerance}\n\n`;

        responseText += `⏳ **Next Steps:**\n`;
        responseText += `1. Use the **get_result** tool with polling URL \`${result.polling_url}\` to check progress\n`;
        responseText += `2. Generation typically takes 10-60 seconds\n`;
        responseText += `3. Result will include the generated image data\n\n`;

        if (result.polling_url) {
          responseText += `🔗 **Polling URL:** ${result.polling_url}\n\n`;
        }

        if (args.webhook_url) {
          responseText += `🔔 **Webhook configured:** You will receive a notification at ${args.webhook_url}\n\n`;
        }

        responseText += `💡 **Tip:** Keep the polling URL handy - you'll need it to retrieve your generated image!`;

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
              text: `❌ Error generating image: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}