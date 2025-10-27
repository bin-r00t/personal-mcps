import { getRequest } from "../helpers/makeRequest.js";
/**
 * Register the check_model_usage tool
 */
export function checkModelUsage(server, config) {
    server.tool("check_model_usage", "Check usage statistics for BFL models and account", {}, async () => {
        try {
            // BFL API doesn't have a specific usage endpoint in the documentation,
            // but we can try to get account information
            const response = await getRequest("/v1/account_usage", config.BFL_API_KEY);
            if (response.error) {
                // If the endpoint doesn't exist, return a helpful message
                if (response.status === 404) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "📊 **Model Usage Information**\n\n" +
                                    "ℹ️ Detailed usage statistics are not available through the current API endpoint.\n\n" +
                                    "💡 **For usage tracking:**\n" +
                                    "• Use check_user_credit to monitor credit balance\n" +
                                    "• Keep track of your generations locally\n" +
                                    "• Check your BFL dashboard for detailed statistics\n\n" +
                                    "📋 **Account Status:**\n" +
                                    "• API Key: Configured ✅\n" +
                                    "• Default Model: " + config.model + "\n" +
                                    "• Download Path: " + config.download_path
                            },
                        ],
                    };
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ Error checking usage: ${response.error}`,
                        },
                    ],
                };
            }
            const usage = response.data;
            let responseText = "📊 **Model Usage Statistics**\n\n";
            responseText += `Usage data: ${JSON.stringify(usage, null, 2)}`;
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
                        text: `❌ Error checking usage: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
            };
        }
    });
}
