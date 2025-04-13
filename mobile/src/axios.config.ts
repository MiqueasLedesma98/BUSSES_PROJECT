import axios from "axios";

const api = axios.create({
  baseURL: "https://nhvdt5z3-3000.brs.devtunnels.ms/api",
});

api.interceptors.request.use(async config => {
  const token = "";
  config.headers["x-token"] = token;
  return config;
});

export default api;
