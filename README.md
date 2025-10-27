# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a repository containing Model Context Protocol (MCP) servers written in TypeScript. The repository contains two MCP server implementations:

1. **weather-mcp** - A weather information server that provides access to US weather data
2. **bfl-mcp** - A Black Forest Labs integration server (currently empty/placeholder)

Both servers are built using the `@modelcontextprotocol/sdk` and provide tools through the MCP protocol.

## Architecture

### weather-mcp Server
- **Location**: `weather-mcp/`
- **Purpose**: Provides weather alerts and forecasts for US locations
- **API Integration**: Uses the National Weather Service (NWS) API
- **Tools**:
  - `get_alerts`: Get weather alerts for a US state
  - `get_forecast`: Get weather forecast for coordinates

### bfl-mcp Server
- **Location**: `bfl-mcp/`
- **Purpose**: Placeholder for Black Forest Labs integration
- **Status**: Empty implementation ready for development

## Development Commands

### Building
```bash
# Build weather-mcp
cd weather-mcp && npm run build

# Build bfl-mcp
cd bfl-mcp && npm run build
```

### Installation
```bash
# Install dependencies for weather-mcp
cd weather-mcp && npm install

# Install dependencies for bfl-mcp
cd bfl-mcp && npm install
```

## Code Structure

### weather-mcp Structure
```
weather-mcp/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── vars.ts               # Constants (API base URLs, user agent)
│   ├── helpers.ts            # Utility functions and types
│   └── tools/
│       ├── get_alerts.ts     # Weather alerts tool implementation
│       └── get_forecast.ts   # Weather forecast tool implementation
├── build/                    # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

### Key Components

#### MCP Server Setup
- Uses `McpServer` from `@modelcontextprotocol/sdk/server/mcp.js`
- Communicates via `StdioServerTransport`
- Tools are registered using `server.tool()` method

#### TypeScript Configuration
- Target: ES2022
- Module: Node16
- Output directory: `./build`
- Strict mode enabled

#### Error Handling
- All API requests wrapped in try-catch blocks
- Graceful error responses returned to MCP clients
- Console error logging for debugging

## Development Notes

### Weather API Integration
- The weather-mcp server integrates with the US National Weather Service API
- Only supports US locations (latitude/longitude coordinates)
- Requires proper User-Agent header for API requests
- API rate limiting and error handling implemented

### Tool Implementation Pattern
- Tools are implemented as separate modules in `src/tools/`
- Each tool exports a `ToolCallback` function
- Zod schemas used for parameter validation
- Consistent response format with content arrays

### Build Process
- TypeScript compilation to `build/` directory
- Executable permissions set on build output
- ES modules configuration (`"type": "module"`)

## Testing

To test the MCP servers after building:
```bash
# Run weather server
./weather-mcp/build/index.js

# Test with MCP client (Claude Desktop, etc.)
# Add server configuration pointing to build/index.js
```