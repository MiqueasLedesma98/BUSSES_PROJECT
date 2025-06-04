const {
  syncWithMainServer,
  syncMediaFyles,
  readNestedFolders,
} = require("../helpers");
const { axios } = require("./axios");

let isRunning = false;

module.exports = {
  start: [
    "*/2 * * * *",
    async () => {
      try {
        if (isRunning) return;
        else {
          isRunning = true;
          await syncWithMainServer();
          const localStructure = await readNestedFolders();
          await syncMediaFyles([]);
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
