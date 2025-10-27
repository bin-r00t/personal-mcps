#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as tools from "./tools/index.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load configuration from environment variables or config.json
function loadConfig() {
    // First try environment variables (from MCP.json)
    const envConfig = {
        BFL_API_KEY: process.env.BFL_API_KEY,
        model: process.env.model || "flux-dev",
        download_path: process.env.download_path || "./models"
    };
    // If API key is provided in environment, use that
    if (envConfig.BFL_API_KEY) {
        return {
            BFL_API_KEY: envConfig.BFL_API_KEY,
            model: envConfig.model,
            download_path: envConfig.download_path
        };
    }
    // Fallback to config.json file
    try {
        const configPath = join(__dirname, "..", "config.json");
        const configFile = readFileSync(configPath, "utf-8");
        const config = JSON.parse(configFile);
        if (!config.BFL_API_KEY || config.BFL_API_KEY === "your_api_key_here") {
            throw new Error("BFL_API_KEY not configured. Please set BFL_API_KEY in environment variables or config.json");
        }
        return {
            BFL_API_KEY: config.BFL_API_KEY,
            model: config.model || "flux-dev",
            download_path: config.download_path || "./models"
        };
    }
    catch (error) {
        if (error.code === "ENOENT") {
            throw new Error("Configuration file not found. Please set BFL_API_KEY in environment variables or create config.json");
        }
        throw error;
    }
}
// Create and configure the MCP server
async function createServer() {
    try {
        // Load configuration
        const config = loadConfig();
        // Initialize MCP server
        const server = new McpServer({
            name: "bfl-mcp",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        // Register all tools with configuration
        tools.registerAllTools(server, config);
        // Error handling - MCP server doesn't have onerror property
        // Error handling will be handled by individual tools
        process.on("SIGINT", async () => {
            await server.close();
            process.exit(0);
        });
        return server;
    }
    catch (error) {
        console.error("Failed to create server:", error);
        process.exit(1);
    }
}
// Start the server
async function main() {
    const server = await createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("BFL MCP server running on stdio");
}
// Start the application
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
