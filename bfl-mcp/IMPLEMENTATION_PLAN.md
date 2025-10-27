# BFL MCP Tools Implementation Plan

## Overview
Build comprehensive MCP tools for Black Forest Labs API integration with proper configuration support for users adding the server via MCP.json.

## Phase 1: Core Infrastructure with Configuration

### 1. Main Server with Config Handling (`index.ts`)
- Parse config from MCP.json (BFL_API_KEY, model, download_path)
- Fallback to config.json if no environment variables provided
- Set up MCP server with proper configuration
- Handle command-line arguments and environment variables

### 2. HTTP Request Helper (`makeRequest.ts`)
- API client with authentication from configured API key
- Implement HTTP client with proper headers for BFL API
- Error handling and response parsing
- Support for both GET and POST requests

### 3. Type Definitions (`model.d.ts`)
- Expand model enums to include all FLUX variants
- Define configuration types
- Define request/response types for all endpoints
- Add common types (AsyncResponse, ResultResponse, etc.)

## Phase 2: Core Tools with Config Integration

### 4. Image Generation Tools
- **generate_image.ts** - Main FLUX 1.1 pro generation
- Support for all FLUX models:
  - flux-dev (development model)
  - flux-pro-1.0 (professional v1.0)
  - flux-pro-1.1 (professional v1.1 with ultra mode)
  - flux-pro-1.0-fill (inpainting)
  - flux-pro-1.0-canny (edge control)
  - flux-pro-1.0-depth (depth control)
  - flux-kontext-pro (context editing)
  - flux-kontext-max (advanced context editing)
- Use configured default model from config
- Support model override in tool parameters
- Save images to configured download path

### 5. Result Management Tools
- **get_result.ts** - Poll for generation results
- **check_image_status.ts** - Check task status
- **save_image.ts** - Save generated images to configured path
- Async polling and status checking
- Handle downloaded file paths based on config

## Phase 3: Advanced Features

### 6. Fine-tuning Tools
- **finetune_details.ts** - Get fine-tune details
- **get_my_finetunes.ts** - List user fine-tunes
- **delete_finetune.ts** - Delete fine-tune
- Support for fine-tune generation with all models

### 7. Utility Tools
- **list_models.ts** - List available models
- **check_user_credit.ts** - Check user credits
- **check_model_usage.ts** - Model usage statistics
- Model listing with configured defaults
- Credit checking with API key from config

## Configuration Support

### Environment Variables (from MCP.json)
Users can configure via MCP.json environment variables:
```json
{
  "mcpServers": {
    "bfl-mcp": {
      "command": "node",
      "args": ["/path/to/bfl-mcp/build/index.js"],
      "env": {
        "BFL_API_KEY": "user_api_key_here",
        "model": "flux-pro-1.1",
        "download_path": "/path/to/downloads"
      }
    }
  }
}
```

### Configuration Options
- **BFL_API_KEY**: Required API authentication (string)
- **model**: Default model (string, optional, defaults to "flux-dev")
  - Available options: "flux-dev", "flux-pro-1.0", "flux-pro-1.1", "flux-pro-1.0-fill", "flux-pro-1.0-canny", "flux-pro-1.0-depth", "flux-kontext-pro", "flux-kontext-max"
- **download_path**: Where to save generated images (string, optional, defaults to "./models")

### Fallback Configuration
- If environment variables are not provided, fallback to config.json file
- Support both configuration methods for flexibility

## Key Features

### API Integration
- BFL API authentication via environment variables from MCP.json
- Asynchronous task processing with polling
- Webhook support for real-time notifications
- Comprehensive error handling and validation

### Model Support
- All FLUX models including fine-tuned versions
- Control models (canny, depth) for guided generation
- Inpainting and editing capabilities
- Ultra mode and raw mode options

### Tool Features
- Configurable defaults and download paths
- Support for all generation parameters (prompt, width, height, seed, etc.)
- Credit and usage tracking
- Fine-tuning management

## Implementation Order

1. **Core Infrastructure** - Config handling, HTTP client, types
2. **Basic Tools** - Image generation with popular models
3. **Result Management** - Polling, status checking, saving
4. **Advanced Models** - Control models, inpainting, editing
5. **Fine-tuning** - Create, manage, use custom models
6. **Utilities** - Credits, usage, model listing

## Testing Strategy

- Unit tests for each tool function
- Integration tests with mock BFL API responses
- Configuration validation tests
- Error handling validation
- End-to-end workflow testing

This implementation will provide AI agents with complete access to Black Forest Labs' image generation capabilities through the MCP protocol, with easy configuration for end users.