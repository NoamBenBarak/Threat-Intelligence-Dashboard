import NodeCache from "node-cache";
import { CACHE_CONFIG } from "../constants/consts.js";
import logger from "./logger.js";

export const calculateDerivedThreatScore = (ipQualityScoreData, abuseData) => {
  let score = 0;
  if (ipQualityScoreData?.fraud_score) {
    score = ipQualityScoreData.fraud_score;
  }

  if (abuseData?.abuseConfidenceScore) {
    score = Math.max(score, abuseData.abuseConfidenceScore * 0.7);
  }

  if (ipQualityScoreData?.vpn || ipQualityScoreData?.proxy) {
    score += 20;
  }

  if (ipQualityScoreData?.recent_abuse) {
    score += 10;
  }
  return Math.min(100, Math.round(score));
};

// Initialize in-memory cache for API responses
// TTL: Time to live (how long data stays in cache)
// checkperiod: How often to check for expired entries
const cache = new NodeCache({
  stdTTL: CACHE_CONFIG.TTL,
  checkperiod: CACHE_CONFIG.CHECK_PERIOD,
});

export const getCachedData = (ip) => {
  const cached = cache.get(ip);
  if (cached) {
    logger.info(`Cache hit for IP: ${ip}`);
    return cached;
  }
  logger.info(`Cache miss for IP: ${ip}`);
  return null;
};

export const setCachedData = (ip, data) => {
  cache.set(ip, data);
  logger.info(`Cached data for IP: ${ip}`);
};

export const invalidateCache = (ip) => {
  cache.del(ip);
  logger.info(`Cache invalidated for IP: ${ip}`);
};
