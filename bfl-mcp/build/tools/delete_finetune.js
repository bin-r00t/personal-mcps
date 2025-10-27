import { z } from "zod";
import { getRequest } from "../helpers/makeRequest.js";
/**
 * Register the delete_finetune tool
 */
export function deleteFinetune(server, config) {
    server.tool("delete_finetune", "Delete a fine-tuned model created by the user", {
        finetune_id: z.string().describe("The ID of the fine-tuned model to delete"),
    }, async ({ finetune_id }) => {
        try {
            // Note: Assuming DELETE method, but BFL API might use different method
            const response = await getRequest(`/v1/finetune/${finetune_id}/delete`, config.BFL_API_KEY);
            if (response.error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ Error deleting fine-tune: ${response.error}`,
                        },
                    ],
                };
            }
            const result = response.data;
            let responseText = "🗑️ **Fine-tuned Model Deleted**\n\n";
            responseText += `✅ Successfully deleted fine-tuned model\n`;
            responseText += `• Model ID: ${finetune_id}\n`;
            responseText += `• Result: ${JSON.stringify(result, null, 2)}`;
            return {
                content: [
                    {
                        type: "text",
                        text: responseText,
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `❌ Error deleting fine-tune: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
            };
        }
    });
}
