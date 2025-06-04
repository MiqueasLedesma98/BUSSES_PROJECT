const {
  syncWithMainServer,
  syncMediaFyles,
  readNestedFolders,
} = require("../helpers");

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
