import { NWS_API_BASE } from "../vars.js";
import {
  makeNWSRequest,
  type PointsResponse,
  type ForecastResponse,
  type ForecastPeriod,
} from "../helpers.js";
import z from "zod";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

const latitude = z
  .number()
  .describe("The latitude of the location to get the forecast for.");
const longitude = z
  .number()
  .describe("The longitude of the location to get the forecast for.");

export type Latitude = number;
export type Longitude = number;

export const get_forecast: ToolCallback<{
  latitude: typeof latitude;
  longitude: typeof longitude;
}> = async ({
  latitude,
  longitude,
}: {
  latitude: Latitude;
  longitude: Longitude;
}) => {
  // Get grid point data
  const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(
    4
  )},${longitude.toFixed(4)}`;
  const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

  if (!pointsData) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
        },
      ],
    };
  }

  const forecastUrl = pointsData.properties?.forecast;
  if (!forecastUrl) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to get forecast URL from grid point data",
        },
      ],
    };
  }

  // Get forecast data
  const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
  if (!forecastData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve forecast data",
        },
      ],
    };
  }

  const periods = forecastData.properties?.periods || [];
  if (periods.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "No forecast periods available",
        },
      ],
    };
  }

  // Format forecast periods
  const formattedForecast = periods.map((period: ForecastPeriod) =>
    [
      `${period.name || "Unknown"}:`,
      `Temperature: ${period.temperature || "Unknown"}°${
        period.temperatureUnit || "F"
      }`,
      `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
      `${period.shortForecast || "No forecast available"}`,
      "---",
    ].join("\n")
  );

  const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join(
    "\n"
  )}`;

  return {
    content: [
      {
        type: "text",
        text: forecastText,
      },
    ],
  };
};
