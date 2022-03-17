import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

const config = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger, toast, api],
  });
};

export default config;
