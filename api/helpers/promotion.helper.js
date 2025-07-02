const { Promotion } = require("../models");
const path = require("path");
const fs = require("fs");

module.exports = {
  handleOldPromotion: async ({ type, lang, type_banner, title }) => {
    const promotion = await Promotion.findOne({
      where: { type, lang, type_banner, title },
    });

    const pathPrimary = path.join(__dirname, "..", promotion?.path ?? "");
    const pathSecondary = path.join(
      __dirname,
      "..",
      promotion?.path_secondary ?? ""
    );

    if (fs.existsSync(pathPrimary) && fs.statSync(pathPrimary).isFile()) {
      fs.rmSync(pathPrimary);
    }

    if (fs.existsSync(pathSecondary) && fs.statSync(pathSecondary).isFile()) {
      fs.rmSync(pathSecondary);
    }

    await promotion?.destroy();
  },
};
