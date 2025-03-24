require("dotenv").config();
const axios = require("axios");
const { generateJWT } = require("../helpers/jwt");

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await generateJWT({ email: process.env.EMAIL });
  config.headers["y-token"] = token;
  return config;
});

module.exports = { axios: instance };
