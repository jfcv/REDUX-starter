import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";

const config = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger],
  });
};

export default config;
