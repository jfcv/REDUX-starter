import { configureStore } from "@reduxjs/toolkit";
import reducer from "./bugs";

const config = () => {
  return configureStore({ reducer });
};

export default config;
