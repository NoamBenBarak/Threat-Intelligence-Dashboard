import axios from "axios";
import { API_ENDPOINTS } from "../constants/consts.js";

export const fetchIntelligenceData = async (ip) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.INTELLIGENCE}?ip=${ip}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching intelligence data for IP: ${ip}`, error);
    throw error;
  }
};
