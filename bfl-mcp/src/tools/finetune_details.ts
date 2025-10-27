import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig } from "../types/model.js";
import { getRequest } from "../helpers/makeRequest.js";

/**
 * Register the finetune_details tool
 */
export function finetuneDetails(server: McpServer, config: BFLConfig) {
  server.tool(
    "finetune_details",
    "Get details about a specific fine-tuned model",
    {
      finetune_id: z.string().describe("The ID of the fine-tuned model"),
    },
    async ({ finetune_id }) => {
      try {
        const response = await getRequest(`/v1/finetune/${finetune_id}`, config.BFL_API_KEY);

        if (response.error) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error getting fine-tune details: ${response.error}`,
              },
            ],
          };
        }

        const details = response.data;

        let responseText = `🎯 **Fine-tune Details**\n\n`;
        responseText += `Fine-tune ID: ${finetune_id}\n\n`;
        responseText += `Details:\n${JSON.stringify(details, null, 2)}`;

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
              text: `❌ Error getting fine-tune details: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}