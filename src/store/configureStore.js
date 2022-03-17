import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";

const config = () => {
  return configureStore({ reducer, middleware: [logger] });
};

export default config;
