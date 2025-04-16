import axios from "axios";

export const baseUrl = "https://nhvdt5z3-3000.brs.devtunnels.ms/api";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(async config => {
  const token = "";
  config.headers["x-token"] = token;
  return config;
});

export default api;
