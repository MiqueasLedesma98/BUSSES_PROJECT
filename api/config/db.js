require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 2,
      acquire: 20000,
      idle: 5000,
    },
  }
);

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión con DB establecida");

    await sequelize.sync({ force: true });
    console.log("Database sincronizada");
  } catch (error) {
    console.error("No se a podido conectar a la base de datos:", error);
  }
};

module.exports = { sequelize, initializeDB };
