import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

/**
 * logger middleware is disabled
 * make sure to add to the middleware property array
 */
const config = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), toast, api],
  });
};

export default config;
