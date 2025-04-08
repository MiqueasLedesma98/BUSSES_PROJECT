import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(async config => {
  const token = "";
  config.headers["x-token"] = token;
  return config;
});

export default api;
