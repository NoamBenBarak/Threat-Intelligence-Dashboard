import { VALIDATION } from "../constants/consts";

export const validateIP = (ip) => VALIDATION.IP_REGEX.test(ip);
