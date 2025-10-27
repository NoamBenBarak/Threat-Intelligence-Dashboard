import axios from "axios";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import NodeCache from 'node-cache';
import { validateApiResponse } from "../utils/validateApiResponse.js";
import { 
  API_ENDPOINTS, 
  CACHE_CONFIG, 
  ERROR_MESSAGES, 
  API_HEADERS, 
  DEFAULT_VALUES 
} from "../constants/consts.js";

dotenv.config();

// Initialize in-memory cache for API responses
// TTL: Time to live (how long data stays in cache)
// checkperiod: How often to check for expired entries
const cache = new NodeCache({ 
  stdTTL: CACHE_CONFIG.TTL,
  checkperiod: CACHE_CONFIG.CHECK_PERIOD 
});

const ABUSEIPDB_KEY = process.env.ABUSE_IPDB_KEY;
const IPQUALITYSCORE_KEY = process.env.IPQUALITYSCORE_KEY;


const getCachedData = (ip) => {
  const cached = cache.get(ip);
  if (cached) {
    logger.info(`Cache hit for IP: ${ip}`);
    return cached;
  }
  logger.info(`Cache miss for IP: ${ip}`);
  return null;
};

const setCachedData = (ip, data) => {
  cache.set(ip, data);
  logger.info(`Cached data for IP: ${ip}`);
};

const invalidateCache = (ip) => {
  cache.del(ip);
  logger.info(`Cache invalidated for IP: ${ip}`);
};

const fetchFromAPIs = async (ip) => {
  logger.info(`Fetching intelligence data (API) for IP: ${ip}`);
  
  const abusePromise = axios.get(API_ENDPOINTS.ABUSEIPDB, {
    headers: {
      Key: ABUSEIPDB_KEY,
      ...API_HEADERS.ABUSEIPDB
    },
    params: {
      ipAddress: ip,
      maxAgeInDays: CACHE_CONFIG.MAX_AGE_DAYS,
    },
  });
  
  const ipqsPromise = axios.get(
    `${API_ENDPOINTS.IPQUALITYSCORE}/${IPQUALITYSCORE_KEY}/${ip}`
  );
  
  const [abuseRes, ipqsRes] = await Promise.all([abusePromise, ipqsPromise]);

  logger.info(`Successfully received data from both APIs for IP: ${ip}`);

  const abuseData = abuseRes.data.data;
  const ipqsData = ipqsRes.data;

  validateApiResponse(abuseData, 'AbuseIPDB');
  validateApiResponse(ipqsData, 'IPQualityScore');

  const result = {
    ip: ip,
    hostname: ipqsData?.hostname || DEFAULT_VALUES.HOSTNAME,
    isp: ipqsData?.isp || DEFAULT_VALUES.ISP,
    country: ipqsData?.country_code || DEFAULT_VALUES.COUNTRY,
    abuseScore: abuseData?.abuseConfidenceScore || DEFAULT_VALUES.ABUSE_SCORE,
    recentReports: abuseData?.totalReports || DEFAULT_VALUES.RECENT_REPORTS,
    vpnDetected: ipqsData?.vpn || DEFAULT_VALUES.VPN_DETECTED,
    threatScore: ipqsData?.fraud_score || DEFAULT_VALUES.THREAT_SCORE,
  };

  logger.info(`Processed intelligence data for IP: ${ip}`, { 
    abuseScore: result.abuseScore, 
    threatScore: result.threatScore,
    vpnDetected: result.vpnDetected 
  });

  return result;
};

export const fetchIntelligenceData = async (ip) => {
  if (!ip) throw new Error(ERROR_MESSAGES.IP_REQUIRED);

  const cachedData = getCachedData(ip);
  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetchFromAPIs(ip);
    setCachedData(ip, data);
    return data;
  } catch (error) {
    logger.error(`Error fetching intelligence data for IP: ${ip}`, error);
    invalidateCache(ip);
    throw error;
  }
};
