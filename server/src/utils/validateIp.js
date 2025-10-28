import ip from "ip";
import logger from "./logger.js";
import { ERROR_MESSAGES } from "../constants/consts.js";

export const validateIp = (ipAddress) => {
  if (!ipAddress || typeof ipAddress !== "string") {
    logger.warn(`IP validation failed - IP address is required`);
    return { valid: false, error: ERROR_MESSAGES.IP_REQUIRED };
  }

  if (!ip.isV4Format(ipAddress)) {
    logger.warn(
      `IP validation failed - Invalid IP address format: ${ipAddress}`
    );
    return { valid: false, error: ERROR_MESSAGES.INVALID_IP_FORMAT };
  }

  if (ip.isPrivate(ipAddress)) {
    logger.warn(
      `IP validation failed - Private IP address not allowed: ${ipAddress}`
    );
    return { valid: false, error: ERROR_MESSAGES.PRIVATE_IP_NOT_ALLOWED };
  }

  if (ip.isLoopback(ipAddress)) {
    logger.warn(
      `IP validation failed - Localhost addresses not allowed: ${ipAddress}`
    );
    return { valid: false, error: ERROR_MESSAGES.LOCALHOST_NOT_ALLOWED };
  }

  if (ipAddress === "0.0.0.0" || ipAddress === "255.255.255.255") {
    logger.warn(
      `IP validation failed - Special IP address not allowed: ${ipAddress}`
    );
    return { valid: false, error: ERROR_MESSAGES.SPECIAL_IP_NOT_ALLOWED };
  }
  return { valid: true };
};
