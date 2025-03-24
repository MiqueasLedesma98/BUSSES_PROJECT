const { Multimedia } = require("../models");
const { axios } = require("./axios");

let isRunning = false;

module.exports = {
  start: async () => {
    try {
      if (isRunning) return;
      else {
        const { data } = await axios.post("/sync", {
          user: process.env.USER,
          password: process.env.PASSWORD,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      isRunning = false;
    }
  },
};
