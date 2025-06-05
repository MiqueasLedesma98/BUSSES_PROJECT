const {
  syncWithMainServer,
  syncMediaFyles,
  readNestedFolders,
} = require("../helpers");

const NODE_ENV = process.env.NODE_ENV;
const MAIN_SERVER = NODE_ENV === "MAIN_SERVER" || NODE_ENV === "DEV";

let isRunning = false;

module.exports = {
  start: [
    "*/2 * * * *",
    async () => {
      try {
        if (isRunning) return;
        if (MAIN_SERVER) return;
        else {
          isRunning = true;
          await syncWithMainServer();
          const localStructure = await readNestedFolders();
          await syncMediaFyles([], localStructure);
        }
      } catch (error) {
        console.error(error.response?.data?.msg);
      } finally {
        isRunning = false;
      }
    },
    { timezone: "America/Argentina/Buenos_Aires" },
  ],
};
