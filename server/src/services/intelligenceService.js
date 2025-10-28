import axios from "axios";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { validateApiResponse } from "../utils/validateApiResponse.js";
import { getName } from 'country-list';
import { 
  API_ENDPOINTS, 
  CACHE_CONFIG, 
  ERROR_MESSAGES, 
  API_HEADERS, 
  DEFAULT_VALUES 
} from "../constants/consts.js";
import { calculateDerivedThreatScore, getCachedData, invalidateCache, setCachedData } from "../utils/util.js";

dotenv.config();

const ABUSEIPDB_KEY = process.env.ABUSE_IPDB_KEY;
const IPQUALITYSCORE_KEY = process.env.IPQUALITYSCORE_KEY;


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
  
  const [abuseIpDbResponse, ipQualityScoreResponse] = await Promise.all([abusePromise, ipqsPromise]);

  logger.info(`Successfully received data from both APIs for IP: ${ip}`);

  const abuseIpDbData = abuseIpDbResponse.data.data;
  const ipQualityScoreData = ipQualityScoreResponse.data;

  logger.info(`abuseIpDbData: ${abuseIpDbData}`);
  logger.info(`ipQualityScoreData: ${ipQualityScoreData}`);

  validateApiResponse(abuseIpDbData, 'AbuseIPDB');
  validateApiResponse(ipQualityScoreData, 'IPQualityScore');

  const countryName = getName(ipQualityScoreData?.country_code || abuseIpDbData?.countryCode) || DEFAULT_VALUES.COUNTRY;

  const threatScoreValue = calculateDerivedThreatScore(ipQualityScoreData, abuseIpDbData) ?? DEFAULT_VALUES.THREAT_SCORE;

  const result = {
    ip: ip,
    hostname: ipQualityScoreData?.host || DEFAULT_VALUES.HOSTNAME,
    isp: ipQualityScoreData?.ISP || abuseIpDbData?.isp|| DEFAULT_VALUES.ISP,
    country: countryName,
    abuseScore: abuseIpDbData?.abuseConfidenceScore || DEFAULT_VALUES.ABUSE_SCORE,
    recentReports: abuseIpDbData?.totalReports || DEFAULT_VALUES.RECENT_REPORTS,
    vpnOrProxyDetected: ipQualityScoreData?.vpn ||ipQualityScoreData?.proxy|| DEFAULT_VALUES.VPN_DETECTED,
    threatScore: threatScoreValue,
  };

  logger.info(`Processed intelligence data for IP: ${ip}`, { 
    abuseScore: result.abuseScore, 
    threatScore: result.threatScore,
    vpnOrProxyDetected: result.vpnOrProxyDetected 
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
