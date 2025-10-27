import fetch from "node-fetch";
/**
 * Make HTTP request to BFL API
 */
export async function makeRequest(endpoint, apiKey, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `https://api.bfl.ai${endpoint}`;
    const defaultHeaders = {
        "Content-Type": "application/json",
        "x-key": apiKey,
        "User-Agent": "bfl-mcp/1.0.0"
    };
    try {
        const headers = {
            ...defaultHeaders,
        };
        // Add any additional headers from options
        if (options.headers) {
            if (typeof options.headers === 'object') {
                Object.assign(headers, options.headers);
            }
        }
        const requestOptions = {
            ...options,
            headers,
        };
        // Handle null body case for fetch
        if (options.body === null) {
            delete requestOptions.body;
        }
        const response = await fetch(url, requestOptions);
        const responseData = await response.text();
        // Handle empty responses
        if (!responseData) {
            return {
                status: response.status,
                error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
            };
        }
        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(responseData);
        }
        catch (parseError) {
            return {
                status: response.status,
                error: `Invalid JSON response: ${responseData.substring(0, 200)}`
            };
        }
        if (response.ok) {
            return {
                status: response.status,
                data
            };
        }
        else {
            // Handle API errors
            const errorMessage = data?.detail || data?.error || `HTTP ${response.status}: ${response.statusText}`;
            return {
                status: response.status,
                error: errorMessage
            };
        }
    }
    catch (error) {
        return {
            status: 0,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}
/**
 * Make POST request to BFL API
 */
export async function postRequest(endpoint, apiKey, data) {
    return makeRequest(endpoint, apiKey, {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
    });
}
/**
 * Make GET request to BFL API
 */
export async function getRequest(endpoint, apiKey) {
    return makeRequest(endpoint, apiKey, {
        method: "GET",
    });
}
/**
 * Poll for async task result using polling URL
 */
export async function pollForResult(pollingUrl, apiKey, maxAttempts = 60, interval = 2000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const response = await getRequest(pollingUrl, apiKey);
        if (response.error) {
            return response;
        }
        const result = response.data;
        // Check if task is complete
        if (result.status === "Ready") {
            return response;
        }
        // Check if task failed
        if (result.status === "Error" || result.status === "Request Moderated" || result.status === "Content Moderated") {
            return response;
        }
        // Wait before next poll
        if (attempt < maxAttempts - 1) {
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
    return {
        status: 408,
        error: `Timeout after ${maxAttempts} attempts while polling for result`
    };
}
/**
 * Handle base64 image data (convert to/from file)
 */
export function base64ToBuffer(base64) {
    // Remove data URL prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}
export function bufferToBase64(buffer, mimeType = "image/png") {
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
}
/**
 * Validate image format
 */
export function isValidImageFormat(format) {
    return ["jpeg", "png", "webp"].includes(format.toLowerCase());
}
/**
 * Sanitize filename for safe file saving
 */
export function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
}
