import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

const config = () => {
  return configureStore({ reducer, middleware: [logger, func] });
};

export default config;
