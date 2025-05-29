const axios = require("axios");
const {
  Version,
  User,
  Multimedia,
  Category,
  Bus,
  Company,
  Promotion,
  Device,
} = require("../models");
const { sequelize } = require("../config/db");
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL;

async function exportLocalChanges() {
  const [multimediaViews, promotionViews] = await Promise.all([
    Multimedia.findAll({
      attributes: ["views", "id"],
    }),
    Promotion.findAll({
      attributes: ["views", "id"],
    }),
  ]);

  return { multimediaViews, promotionViews };
}

async function resetAndImportDatabase(data) {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.sync({ force: true, transaction });

    await Promise.all(
      data.users.map((user) => User.create(user, { transaction, hooks: false }))
    );

    await Promise.all(
      data.multimedia.map((media) => Multimedia.create(media, { transaction }))
    );
    await Promise.all(
      data.category.map((category) =>
        Category.create(category, { transaction })
      )
    );
    await Promise.all(data.Bus.map((bus) => Bus.create(bus, { transaction })));

    await Promise.all(
      data.companies.map((company) => Company.create(company, { transaction }))
    );

    await Promise.all(
      data.promotions.map((promotion) =>
        Promotion.create(promotion, { transaction })
      )
    );

    await Promise.all(
      data.devices.map((device) => Device.create(device, { transaction }))
    );

    await Version.create({ number: data.versionNumber }, { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  /**
   * @description Sincroniza las bases de datos remota y local
   */
  syncWithMainServer: async function () {
    const { data: remoteVersion } = await axios.get(
      MAIN_SERVER_URL + "/version"
    );

    await axios.post(MAIN_SERVER_URL + "/version/sync", {
      data: await exportLocalChanges(),
    });

    const localVersion = await Version.findOne({
      order: [["number", "DESC"]],
    });

    if (!localVersion || remoteVersion.number > localVersion.number) {
      const { data: backup } = await axios.get(MAIN_SERVER_URL + "/backup");

      await resetAndImportDatabase(backup);
    }
  },
  /**
   * Sincroniza archivos entre la carpeta local y la base de datos.
   * @param {string[]} dbImagePaths - Array de rutas relativas desde la base de datos, ej: ["producto1.png"]
   */
  syncMediaFyles: async function () {
    // TODO: sincronizar carpeta multimedia
  },
};
