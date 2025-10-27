export const API_ENDPOINTS = {
  ABUSEIPDB: 'https://api.abuseipdb.com/api/v2/check',
  IPQUALITYSCORE: 'https://ipqualityscore.com/api/json/ip'
};

export const CACHE_CONFIG = {
  TTL: 3600, // 1 hour in seconds
  CHECK_PERIOD: 600, // 10 minutes in seconds
  MAX_AGE_DAYS: 90 // for AbuseIPDB API
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const ERROR_MESSAGES = {
  IP_REQUIRED: 'IP address is required',
  INVALID_IP_FORMAT: 'Invalid IP address format',
  PRIVATE_IP_NOT_ALLOWED: 'Private IP addresses are not allowed',
  LOCALHOST_NOT_ALLOWED: 'Localhost addresses are not allowed',
  SPECIAL_IP_NOT_ALLOWED: 'Special IP addresses are not allowed',
  API_FETCH_FAILED: 'Failed to fetch intelligence data',
  INVALID_API_RESPONSE: 'Invalid API response format',
  MISSING_API_KEY: 'API key is missing'
};

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

export const API_HEADERS = {
  ABUSEIPDB: {
    'Accept': 'application/json'
  }
};

export const DEFAULT_VALUES = {
  THREAT_SCORE: 0,
  ABUSE_SCORE: 0,
  RECENT_REPORTS: 0,
  VPN_DETECTED: false,
  HOSTNAME: null,
  ISP: null,
  COUNTRY: null
};
