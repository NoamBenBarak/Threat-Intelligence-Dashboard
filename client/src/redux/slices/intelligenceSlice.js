import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_MESSAGES, VALIDATION } from "../../constants/consts.js";
import { loadFromHistory, saveToHistory } from "../../utils/localStorage.js";
import { fetchIntelligenceData } from "../../api/intelligenceApi.js";
import { validateIP } from "../../utils/validation.js";

// Async thunk for fetching intelligence data from backend
// This handles the entire flow: validation -> API call -> error handling
export const fetchIntelligence = createAsyncThunk(
  "intelligence/fetchIntelligence",
  async (ip, { rejectWithValue }) => {
    if (!validateIP(ip)) {
      console.warn(`Invalid IP address format: ${ip}`);
      return rejectWithValue(ERROR_MESSAGES.INVALID_IP);
    }

    try {
      const data = await fetchIntelligenceData(ip);
      console.info(`Successfully received intelligence data for IP: ${ip}`);
      return data;
    } catch (error) {
      console.error(`API request failed for IP: ${ip}`, error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          ERROR_MESSAGES.UNKNOWN_ERROR
      );
    }
  }
);

const intelligenceSlice = createSlice({
  name: "intelligence",
  initialState: {
    loading: false,
    data: null,
    error: null,
    history: loadFromHistory(),
  },
  reducers: {
    clearIntelligence: (state) => {
      console.info(`Clearing intelligence data`);
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIntelligence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntelligence.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // Save to localStorage and update Redux state
        saveToHistory(action.payload.ip, action.payload);
        state.history = loadFromHistory();
      })
      .addCase(fetchIntelligence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const { clearIntelligence } = intelligenceSlice.actions;
export default intelligenceSlice.reducer;
