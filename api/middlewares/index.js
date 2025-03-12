module.exports = {
  ...require("./error-handler"),
  ...require("./validate-fields"),
  ...require("./validate-jwt"),
  ...require("./upload-multer"),
};
