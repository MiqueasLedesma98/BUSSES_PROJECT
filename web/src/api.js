import axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-token");
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.msg) {
      error.message = error.response.data.msg;
    }
    console.log(error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.msg) {
      error.message = error.response.data.msg;
    }
    return Promise.reject(error);
  }
);

export default api;
