import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const config = () => {
  return configureStore({ reducer });
};

export default config;
