import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BFLConfig } from "../types/model.js";
import { getRequest } from "../helpers/makeRequest.js";

/**
 * Register the get_my_finetunes tool
 */
export function getMyFinetunes(server: McpServer, config: BFLConfig) {
  server.tool(
    "get_my_finetunes",
    "List all fine-tuned models created by the user",
    {},
    async () => {
      try {
        const response = await getRequest("/v1/finetunes", config.BFL_API_KEY);

        if (response.error) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error getting fine-tunes: ${response.error}`,
              },
            ],
          };
        }

        const finetunes = response.data;

        let responseText = "🎨 **Your Fine-tuned Models**\n\n";

        if (Array.isArray(finetunes) && finetunes.length === 0) {
          responseText += "No fine-tuned models found. Create your first fine-tuned model to see it here!";
        } else if (Array.isArray(finetunes)) {
          responseText += `Found ${finetunes.length} fine-tuned model(s):\n\n`;
          finetunes.forEach((finetune, index) => {
            responseText += `${index + 1}. **${finetune.name || finetune.id}**\n`;
            responseText += `   ID: ${finetune.id}\n`;
            responseText += `   Status: ${finetune.status}\n`;
            responseText += `   Created: ${finetune.created_at}\n`;
            if (finetune.mode) responseText += `   Mode: ${finetune.mode}\n`;
            if (finetune.iterations) responseText += `   Iterations: ${finetune.iterations}\n`;
            responseText += "\n";
          });
        } else {
          responseText += `Fine-tunes data: ${JSON.stringify(finetunes, null, 2)}`;
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
              text: `❌ Error getting fine-tunes: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );
}