const { axios } = require("./axios");

let isRunning = false;
let alreadyFirst = false;

module.exports = {
  start: [
    "*/2 * * * *",
    async () => {
      try {
        if (isRunning) return;
        else {
          const { data } = await axios.post("/sync", {
            user: process.env.USER,
            password: process.env.PASSWORD,
          });
        }
      } catch (error) {
        console.error(error.response?.data?.msg);
      } finally {
        isRunning = false;
      }
    },
    { timezone: "America/Argentina/Buenos_Aires" },
  ],
  firstSiync: [
    "*/1 * * * *",
    async () => {
      if (alreadyFirst) return;
      try {
        const { data } = await axios.post("/sync/first", {
          user: process.env.USER,
          password: process.env.PASSWORD,
        });

        if (data?.exists) alreadyFirst = true;
        if (data?.created) alreadyFirst = true;
      } catch (error) {
        alreadyFirst = false;
        console.log(error);
      }
    },
    { timezone: "America/Argentina/Buenos_Aires" },
  ],
};
