import logger from "./logger.js";
import { ERROR_MESSAGES } from "../constants/consts.js";

export const validateApiResponse = (data, apiName) => {
  if (!data) {
    logger.error(`${apiName} API returned null/undefined`);
    throw new Error(
      `${ERROR_MESSAGES.INVALID_API_RESPONSE} - ${apiName} returned no data`
    );
  }

  if (typeof data !== "object") {
    logger.error(`${apiName} API returned invalid format:`, typeof data);
    throw new Error(
      `${ERROR_MESSAGES.INVALID_API_RESPONSE} - ${apiName} returned invalid format`
    );
  }

  return true;
};
