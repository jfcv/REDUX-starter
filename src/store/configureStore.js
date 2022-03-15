import { configureStore } from "@reduxjs/toolkit";
import reducer from "./projects";

const config = () => {
  return configureStore({ reducer });
};

export default config;
