const {
  syncWithMainServer,
  syncMediaFyles,
  readNestedFolders,
} = require("../helpers");

const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
const MAIN_SERVER = NODE_ENV === "MAIN_SERVER" || NODE_ENV === "DEV";

let isRunning = false;

module.exports = {
  start: [
    "*/1 * * * *",
    async () => {
      try {
        if (isRunning) return;
        if (MAIN_SERVER) return;
        else {
          isRunning = true;
          const shouldSyncMediaFolder = await syncWithMainServer();
          if (shouldSyncMediaFolder) {
            const localStructure = await readNestedFolders(
              path.join(__dirname, "..", "media")
            );
            await syncMediaFyles([], localStructure);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        isRunning = false;
      }
    },
  ],
};
