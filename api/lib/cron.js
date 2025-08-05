const {
  syncWithMainServer,
  syncMediaFyles,
  readNestedFolders,
} = require("../helpers");

const path = require("path");
const { Multimedia, Promotion } = require("../models");

let isRunning = false;

module.exports = {
  start: [
    "*/25 * * * * *",
    async () => {
      try {
        if (isRunning) return;
        else {
          isRunning = true;
          const shouldSyncMediaFolder = await syncWithMainServer();
          await Promise.all([
            Multimedia.update({ views: 0 }, { where: {} }),
            Promotion.update({ views: 0 }, { where: {} }),
          ]);
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
