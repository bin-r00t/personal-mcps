import { z } from "zod";
import { getRequest } from "../helpers/makeRequest.js";
/**
 * Register the get_result tool
 */
export function getResult(server, config) {
    server.tool("get_result", "Get the result of an image generation task by using the polling URL from the generation response", {
        polling_url: z.string().describe("The polling URL returned from the image generation step"),
    }, async ({ polling_url }) => {
        try {
            // Use the polling URL directly instead of constructing our own
            const response = await getRequest(polling_url, config.BFL_API_KEY);
            if (response.error) {
                console.error('response ==> ', response);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error getting result: ${response.error}`,
                        },
                    ],
                };
            }
            const result = response.data;
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
                // If the result contains an image, add info about it
                if (typeof result.result === 'object' && result.result.sample) {
                    responseText += `\n- Image data included in result`;
                    responseText += `\n- Width: ${result.result.width || 'unknown'}`;
                    responseText += `\n- Height: ${result.result.height || 'unknown'}`;
                    responseText += `\n- Format: ${result.result.content_type || 'unknown'}`;
                }
            }
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
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error getting result: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
            };
        }
    });
}
