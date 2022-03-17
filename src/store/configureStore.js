import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";

const config = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger, toast],
  });
};

export default config;
