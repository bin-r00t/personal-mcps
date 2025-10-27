// BFL Model types and enums

export enum Model {
  // Core models
  FLUX_DEV = "flux-dev",
  FLUX_PRO_1_0 = "flux-pro-1.0",
  FLUX_PRO_1_1 = "flux-pro-1.1",

  // Specialized models
  FLUX_PRO_1_0_FILL = "flux-pro-1.0-fill",
  FLUX_PRO_1_0_CANNY = "flux-pro-1.0-canny",
  FLUX_PRO_1_0_DEPTH = "flux-pro-1.0-depth",
  FLUX_KONTEXT_PRO = "flux-kontext-pro",
  FLUX_KONTEXT_MAX = "flux-kontext-max",

  // Legacy models (keep for compatibility)
  FLUX_PRO = "flux-pro-1.0",
  FLUX_FILL_PRO = "flux-pro-1.0-fill",
}

export enum OutputFormat {
  JPEG = "jpeg",
  PNG = "png",
  WEBP = "webp"
}

export enum Priority {
  SPEED = "speed",
  QUALITY = "quality",
  HIGH_RES_ONLY = "high_res_only"
}

export enum FinetuneMode {
  GENERAL = "general",
  CHARACTER = "character",
  STYLE = "style",
  PRODUCT = "product"
}

export enum FinetuneType {
  LORA = "lora",
  FULL = "full"
}

export enum Status {
  NOT_FOUND = "Task not found",
  PENDING = "Pending",
  REQUEST_MODERATED = "Request Moderated",
  CONTENT_MODERATED = "Content Moderated",
  READY = "Ready",
  ERROR = "Error"
}

// Base interfaces
export interface BaseGenerationParams {
  prompt: string;
  image_prompt?: string | null;
  output_format?: OutputFormat | null;
  webhook_url?: string | null;
  webhook_secret?: string | null;
}

export interface BaseAsyncParams extends BaseGenerationParams {
  seed?: number | null;
  safety_tolerance?: number;
}

// FLUX DEV parameters
export interface FluxDevParams extends BaseAsyncParams {
  width?: number;
  height?: number;
  steps?: number | null;
  prompt_upsampling?: boolean;
  guidance?: number | null;
}

// FLUX 1.1 PRO parameters
export interface FluxPro11Params extends BaseAsyncParams {
  width?: number;
  height?: number;
  prompt_upsampling?: boolean;
  raw?: boolean;
  ultra?: boolean;
}

// FLUX 1.0 PRO parameters
export interface FluxPro1Params extends BaseAsyncParams {
  width?: number;
  height?: number;
  prompt_upsampling?: boolean;
  guidance?: number | null;
  seed?: number | null;
}

// FLUX FILL parameters
export interface FluxFillParams extends BaseAsyncParams {
  width?: number;
  height?: number;
  steps?: number | null;
  guidance?: number | null;
  prompt_upsampling?: boolean;
  image?: string;
  mask?: string;
}

// FLUX CANNY parameters
export interface FluxCannyParams extends BaseAsyncParams {
  width?: number;
  height?: number;
  steps?: number | null;
  guidance?: number | null;
  prompt_upsampling?: boolean;
  control_image?: string;
  control_strength?: number;
}

// FLUX DEPTH parameters
export interface FluxDepthParams extends BaseAsyncParams {
  width?: number;
  height?: number;
  steps?: number | null;
  guidance?: number | null;
  prompt_upsampling?: boolean;
  control_image?: string;
  control_strength?: number;
}

// FLUX KONTEXT parameters
export interface FluxKontextParams extends BaseAsyncParams {
  width?: number;
  height?: number;
  steps?: number | null;
  guidance?: number | null;
  prompt_upsampling?: boolean;
  image?: string;
  mask?: string;
  seed?: number | null;
}

// Fine-tuning parameters
export interface FinetuneParams {
  file_data: string;
  finetune_comment: string;
  trigger_word?: string;
  mode: FinetuneMode;
  iterations?: number;
  learning_rate?: number | null;
  captioning?: boolean;
  priority?: Priority;
  finetune_type?: FinetuneType;
  lora_rank?: 16 | 32;
  webhook_url?: string | null;
  webhook_secret?: string | null;
}

// Response types
export interface AsyncResponse {
  id: string;
  polling_url?: string;
}

export interface AsyncWebhookResponse {
  id: string;
  status: string;
  webhook_url?: string;
}

export interface ResultResponse<T = any> {
  id: string;
  status: Status;
  result?: T;
  progress?: number;
  details?: any;
  preview?: any;
}

export interface GenerationResult {
  sample?: string; // Base64 encoded image
  width?: number;
  height?: number;
  content_type?: string;
}

// Utility types
export interface CreditsResponse {
  credits: number;
  currency?: string;
}

export interface UsageResponse {
  usage?: any;
  period?: string;
  limits?: any;
}

export interface ModelInfo {
  name: string;
  description?: string;
  capabilities?: string[];
  input_limits?: {
    width: { min: number; max: number };
    height: { min: number; max: number };
  };
}

export interface FinetuneInfo {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at?: string;
  mode: FinetuneMode;
  type: FinetuneType;
  iterations: number;
  trigger_word: string;
  details?: any;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: ValidationError[];
}

// Configuration interface
export interface BFLConfig {
  BFL_API_KEY: string;
  model: string;
  download_path: string;
}

// Tool callback type
export type ToolCallback = any; // Will be imported from @modelcontextprotocol/sdk