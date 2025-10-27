import { getRequest } from "../helpers/makeRequest.js";
/**
 * Register the check_user_credit tool
 */
export function checkUserCredit(server, config) {
    server.tool("check_user_credit", "Check the user's credit balance and account information", {}, async () => {
        try {
            const response = await getRequest("/v1/credits", config.BFL_API_KEY);
            if (response.error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error checking credits: ${response.error}`,
                        },
                    ],
                };
            }
            const credits = response.data;
            let responseText = "💳 Account Credits Information\n\n";
            if (typeof credits === 'object' && credits !== null) {
                if (credits.credits !== undefined) {
                    responseText += `💰 Available Credits: ${credits.credits}\n`;
                }
                if (credits.currency) {
                    responseText += `🪙 Currency: ${credits.currency}\n`;
                }
                if (credits.subscription) {
                    responseText += `📋 Subscription: ${JSON.stringify(credits.subscription, null, 2)}\n`;
                }
                if (credits.usage) {
                    responseText += `📊 Usage Information:\n${JSON.stringify(credits.usage, null, 2)}\n`;
                }
                if (credits.limits) {
                    responseText += `⚠️ Limits:\n${JSON.stringify(credits.limits, null, 2)}\n`;
                }
                // Add any other fields that might be present
                Object.entries(credits).forEach(([key, value]) => {
                    if (!['credits', 'currency', 'subscription', 'usage', 'limits'].includes(key)) {
                        responseText += `${key}: ${JSON.stringify(value, null, 2)}\n`;
                    }
                });
            }
            else {
                responseText += `Credits data: ${JSON.stringify(credits, null, 2)}`;
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
                        text: `Error checking credits: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
            };
        }
    });
}
