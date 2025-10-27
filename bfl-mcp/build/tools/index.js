import { generateImageDev } from "./generate_image.js";
import { getResult } from "./get_result.js";
import { checkImageStatus } from "./check_image_status.js";
import { saveImage } from "./save_image.js";
import { listModels } from "./list_models.js";
import { checkModelUsage } from "./check_model_usage.js";
import { checkUserCredit } from "./check_user_credit.js";
import { finetuneDetails } from "./finetune_details.js";
import { getMyFinetunes } from "./get_my_finetunes.js";
import { deleteFinetune } from "./delete_finetune.js";
/**
 * Register all tools with the MCP server
 */
export function registerAllTools(server, config) {
    // Image Generation Tools
    generateImageDev(server, config);
    // Result Management Tools
    getResult(server, config);
    checkImageStatus(server, config);
    saveImage(server, config);
    // Utility Tools
    listModels(server, config);
    checkModelUsage(server, config);
    checkUserCredit(server, config);
    // Fine-tuning Tools
    finetuneDetails(server, config);
    getMyFinetunes(server, config);
    deleteFinetune(server, config);
}
// Export individual tool functions for direct access if needed
export { generateImageDev, getResult, checkImageStatus, saveImage, listModels, checkModelUsage, checkUserCredit, finetuneDetails, getMyFinetunes, deleteFinetune };
