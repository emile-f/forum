import axios from "axios";
import env from "../config/env";

export const getAllThreads = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/thread/all");
};

export const getThread = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/thread/one?" + id);
};
