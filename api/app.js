// Librerías
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const { schedule } = require("node-cron");
const { crontTasks } = require("./lib");

const isPrimaryInstance = process.env.pm_id == 0;

// Middleware - manejo de error
const { httpErrors } = require("./middlewares");

// DB - Config
const { initializeDB } = require("./config/db");

// Modelos
const { Multimedia, Category, Company, Device } = require("./models");

const app = express();

// Relaciones
Device.belongsTo(Company, { through: "CompanyId", onDelete: "CASCADE" });
Multimedia.belongsToMany(Category, {
  through: "multimedia_categories",
  onDelete: "CASCADE",
});

Category.belongsToMany(Multimedia, {
  through: "multimedia_categories",
  onDelete: "CASCADE",
});

// Conexión con la base de datos
initializeDB();

// Middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({ limit: "10gb" }));
app.use(express.urlencoded({ extended: true, limit: "10gb" }));

// Routes
const routes = fs.readdirSync(path.join(__dirname, "routes"), {
  encoding: "utf-8",
});

// Inicializar rutas
routes.forEach((route) => {
  app.use(`/api/${route.split(".")[0]}`, require(`./routes/${route}`));
});

if (
  ["DEV", "SECONDARY_SERVER"].includes(process.env.NODE_ENV) &&
  isPrimaryInstance
)
  Object.values(crontTasks).forEach((task) => schedule(...task));

// Manejo de errores
app.use(httpErrors);

module.exports = app;
