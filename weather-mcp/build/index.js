import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { get_alerts } from "./tools/get_alerts.js";
import { get_forecast } from "./tools/get_forecast.js";
// Create server instance
const server = new McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// register tools
server.tool("get_alerts", "Get weather alerts for a given US state", {
    state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)."),
}, get_alerts);
server.tool("get_forecast", "Get weather forecast for a location", {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
}, get_forecast);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
// async ({ state }) => {
//   console.error(`get_alerts called with state=${state}`);
//   return {
//     content: [
//       {
//         type: "text",
//         text: `This is a placeholder response for get_alerts with state=${state}.`,
//       },
//     ],
//   };
// }
