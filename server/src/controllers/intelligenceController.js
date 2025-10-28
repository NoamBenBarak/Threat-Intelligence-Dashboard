import { fetchIntelligenceData } from "../services/intelligenceService.js";
import { validateIp } from "../utils/validateIp.js";
import logger from "../utils/logger.js";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants/consts.js";

export const getIntelligence = async (req, res) => {
  const { ip } = req.query;
  logger.info(`Received request for intelligence data for IP: ${ip}`);

  const validation = validateIp(ip);
  if (!validation.valid) {
    logger.warn(`Invalid IP address validation failed: ${validation.error}`);
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: validation.error });
  }

  try {
    const data = await fetchIntelligenceData(ip);
    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    logger.error(`Failed to fetch intelligence data for IP: ${ip}`, error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.API_FETCH_FAILED });
  }
};
