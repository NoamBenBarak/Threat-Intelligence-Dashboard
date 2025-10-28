export const API_ENDPOINTS = {
  INTELLIGENCE: 'http://localhost:5000/api/intel'
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
  INVALID_IP: 'Invalid IP address',
  NETWORK_ERROR: 'Network error occurred',
  SERVER_ERROR: 'Server error occurred',
  UNKNOWN_ERROR: 'Unknown error occurred',
  EMPTY_IP: 'Please enter an IP address'
};

export const UI_TEXT = {
  PLACEHOLDER: 'Enter IP address (e.g., 8.8.8.8)',
  CHECK_BUTTON: 'Check IP',
  CHECKING_BUTTON: 'Checking...',
  LOADING_TEXT: 'Loading intelligence data',
  NO_DATA: 'No data available',
  N_A: 'N/A',
  CLEAR_BUTTON: 'Clear All',
  CLEAR_CONFIRM: 'Are you sure you want to clear all data and history?'
};

export const VALIDATION = {
  IP_REGEX: /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/
};
