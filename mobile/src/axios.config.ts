import axios from "axios";

export const baseUrl = "http://192.168.1.126:4050/api";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(async config => {
  const token = "";
  config.headers["x-token"] = token;
  return config;
});

export default api;
