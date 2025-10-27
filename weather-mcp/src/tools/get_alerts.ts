import { z } from "zod";
import { NWS_API_BASE } from "../vars.js";
import {
  formatAlert,
  makeNWSRequest,
  type AlertsResponse,
} from "../helpers.js";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

const stateSchema = z
  .string()
  .length(2)
  .describe("The state code (e.g., 'CA' for California) to get alerts for.");

export const get_alerts: ToolCallback<{ state: typeof stateSchema }> = async ({
  state,
}) => {
  const stateCode = state.toUpperCase();
  const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
  const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

  if (!alertsData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve alerts data",
        },
      ],
    };
  }

  const features = alertsData.features || [];
  if (features.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No active alerts for ${stateCode}`,
        },
      ],
    };
  }

  const formattedAlerts = features.map(formatAlert);
  const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join(
    "\n"
  )}`;

  return {
    content: [
      {
        type: "text",
        text: alertsText,
      },
    ],
  };
};
