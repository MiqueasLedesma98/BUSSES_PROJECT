const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("veotrans", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conección con DB establecida");

    await sequelize.sync({ force: false });
    console.log("Database sincronizada");
  } catch (error) {
    console.error("No se a podido conectar a la base de datos:", error);
  }
};

module.exports = { sequelize, initializeDB };
