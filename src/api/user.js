import axios from "axios";
import env from "../config/env";

export const getAllUsers = () => {
  console.log("env[process.env.NODE_ENV].api", env[process.env.NODE_ENV].api);
  return axios.get(env[process.env.NODE_ENV].api + "/accounts/all");
};
