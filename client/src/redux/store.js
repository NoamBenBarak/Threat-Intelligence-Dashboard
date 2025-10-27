import { configureStore } from "@reduxjs/toolkit";
import intelligenceReducer from "./slices/intelligenceSlice";

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action.type, "Payload:", action.payload);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    intelligence: intelligenceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
