# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **bfl-mcp** project - a Black Forest Labs integration server for AI image generation using the Model Context Protocol (MCP). This server provides access to Black Forest Labs' FLUX models for image generation, editing, and fine-tuning capabilities.

## Architecture

### Server Details
- **Purpose**: Black Forest Labs API integration for AI image generation
- **API Integration**: Uses the BFL API (https://api.bfl.ai)
- **Status**: Implementation in progress with comprehensive API documentation

## Development Commands

### Building
```bash
# Build the project
npm run build
```

### Installation
```bash
# Install dependencies
npm install
```

## Code Structure

```
bfl-mcp/
├── src/
│   ├── index.ts              # Main server entry point (currently empty)
│   ├── helpers/
│   │   └── makeRequest.ts    # HTTP request helper
│   ├── types/
│   │   └── model.d.ts        # Type definitions
│   └── tools/
│       ├── generate_image.ts        # Image generation tool
│       ├── get_result.ts           # Get generation results
│       ├── check_image_status.ts    # Check image generation status
│       ├── save_image.ts            # Save generated images
│       ├── list_models.ts           # List available models
│       ├── check_model_usage.ts     # Check model usage statistics
│       ├── check_user_credit.ts     # Check user credits
│       ├── finetune_details.ts      # Get finetune details
│       ├── get_my_finetunes.ts      # List user finetunes
│       ├── delete_finetune.ts       # Delete a finetune
│       ├── CLAUDE.md                # API definitions instruction
│       └── instructions/            # API endpoint documentation
│           ├── tasks/               # Image generation tasks
│           └── utilities/           # Utility endpoints
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

### BFL API Integration
- The server integrates with Black Forest Labs API for image generation
- Comprehensive API documentation available in `src/tools/instructions/`
- Supports various FLUX models (FLUX 1.1 pro, FLUX 1 dev, FLUX fill pro, etc.)
- Features include:
  - Image generation with various models
  - Image editing and manipulation
  - Fine-tuning capabilities
  - Asynchronous task processing
  - Credit and usage management

### Tool Implementation Pattern
- Tools are implemented as separate modules in `src/tools/`
- Each tool exports a `ToolCallback` function
- Zod schemas used for parameter validation
- Consistent response format with content arrays
- BFL API endpoints documented in markdown files with OpenAPI specifications

### Build Process
- TypeScript compilation to `build/` directory
- Executable permissions set on build output
- ES modules configuration (`"type": "module"`)

## Testing

To test the MCP server after building:
```bash
# Run BFL server
./build/index.js

# Test with MCP client (Claude Desktop, etc.)
# Add server configuration pointing to build/index.js
```

## BFL API Documentation

The BFL API documentation is stored in `src/tools/instructions/` and contains:
- **Tasks**: Image generation endpoints for different FLUX models
- **Utilities**: Management endpoints for results, finetunes, credits, etc.

Each endpoint includes complete OpenAPI specifications with request/response schemas, examples, and descriptions.

### Available Models and Features
- **FLUX 1.1 pro**: High-quality image generation with ultra mode
- **FLUX 1 pro**: Standard professional image generation
- **FLUX 1 dev**: Development model for experimentation
- **FLUX fill pro**: Image inpainting and completion
- **FLUX canny pro**: Control-based generation with edge detection
- **FLUX depth pro**: Control-based generation with depth maps
- **FLUX kontext pro/max**: Context-aware image editing
- **Fine-tuning**: Custom model training with user data

### API Endpoints Structure
- All generation tasks are asynchronous and return task IDs
- Use `/v1/get_result` to poll for completion
- Webhook support for real-time notifications
- Comprehensive error handling and status reporting