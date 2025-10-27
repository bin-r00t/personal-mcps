/**
 * Register the list_models tool
 */
export function listModels(server, config) {
    server.tool("list_models", "List all available Black Forest Labs models and their capabilities", {}, async () => {
        try {
            let responseText = "🎨 Available Black Forest Labs Models\n\n";
            // Core Generation Models
            responseText += "📸 **Core Generation Models:**\n";
            responseText += `• **flux-dev** - Development model, great for experimentation\n`;
            responseText += `  - Fast generation, good quality\n`;
            responseText += `  - Default resolution: 1024x768\n`;
            responseText += `  - Supports custom dimensions (multiples of 32)\n\n`;
            responseText += `• **flux-pro-1.1** - Latest professional model with ultra mode\n`;
            responseText += `  - Highest quality generation\n`;
            responseText += `  - Supports ultra mode for enhanced detail\n`;
            responseText += `  - Raw mode available for unprocessed output\n`;
            responseText += `  - Maximum resolution: 1440x1440\n\n`;
            responseText += `• **flux-pro-1.0** - Professional generation model\n`;
            responseText += `  - High-quality commercial results\n`;
            responseText += `  - Balance of speed and quality\n`;
            responseText += `  - Maximum resolution: 1440x1440\n\n`;
            // Specialized Models
            responseText += "🔧 **Specialized Models:**\n";
            responseText += `• **flux-pro-1.0-fill** - Image inpainting and completion\n`;
            responseText += `  - Fill missing parts of images\n`;
            responseText += `  - Requires input image and mask\n`;
            responseText += `  - Great for image修复 and completion\n\n`;
            responseText += `• **flux-pro-1.0-canny** - Edge-controlled generation\n`;
            responseText += `  - Uses Canny edge detection for guidance\n`;
            responseText += `  - Requires control image (edge map)\n`;
            responseText += `  - Adjustable control strength\n`;
            responseText += `  - Perfect for precise composition control\n\n`;
            responseText += `• **flux-pro-1.0-depth** - Depth-controlled generation\n`;
            responseText += `  - Uses depth maps for spatial guidance\n`;
            responseText += `  - Requires control image (depth map)\n`;
            responseText += `  - Adjustable control strength\n`;
            responseText += `  - Excellent for 3D spatial composition\n\n`;
            responseText += `• **flux-kontext-pro** - Context-aware image editing\n`;
            responseText += `  - Advanced image editing capabilities\n`;
            responseText += `  - Context-aware modifications\n`;
            responseText += `  - Supports both text and image guidance\n\n`;
            responseText += `• **flux-kontext-max** - Maximum context editing\n`;
            responseText += `  - Most advanced editing capabilities\n`;
            responseText += `  - Large context understanding\n`;
            responseText += `  - Complex scene modifications\n\n`;
            // Common Features
            responseText += "⚙️ **Common Features:**\n";
            responseText += `• **Prompt Upsampling** - Automatic prompt enhancement for more creative results\n`;
            responseText += `• **Safety Tolerance** - Adjustable content moderation (0-6, 0=strictest)\n`;
            responseText += `• **Seed Control** - Reproducible generation with seed values\n`;
            responseText += `• **Output Formats** - JPEG, PNG, WebP support\n`;
            responseText += `• **Resolution Range** - 256x256 to 1440x1440 (multiples of 32)\n\n`;
            // Fine-tuning Support
            responseText += "🎯 **Fine-tuning Support:**\n";
            responseText += `• All models support custom fine-tuning\n`;
            responseText += `• Create personalized models with your data\n`;
            responseText += `• Support for LoRA and full fine-tuning\n`;
            responseText += `• Trigger words for consistent style application\n\n`;
            // Default Configuration
            responseText += "📋 **Current Configuration:**\n";
            responseText += `• Default Model: ${config.model}\n`;
            responseText += `• Download Path: ${config.download_path}\n`;
            responseText += `• API Status: Configured ✅\n\n`;
            // Usage Tips
            responseText += "💡 **Usage Tips:**\n";
            responseText += `• Use **flux-dev** for quick testing and prototyping\n`;
            responseText += `• Use **flux-pro-1.1** for final production images\n`;
            responseText += `• Use **fill** models for image修复 and completion\n`;
            responseText += `• Use **canny/depth** models for precise control\n`;
            responseText += `• Use **kontext** models for advanced editing\n\n`;
            responseText += "🚀 **Getting Started:**\n";
            responseText += `Use the **generate_image_dev** tool to start creating images with FLUX models!`;
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
                        text: `Error listing models: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
            };
        }
    });
}
