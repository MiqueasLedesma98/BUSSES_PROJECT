// Librerias
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");

// Middleware - manejo de error
const { httpErrors, countViews } = require("./middlewares");

// DB - Config
const { initializeDB } = require("./config/db");

// Modelos
const {
  User,
  Multimedia,
  Bus,
  Category,
  Company,
  Device,
  Promotion,
} = require("./models");

const app = express();

// Relaciones
User.hasMany(Multimedia, { foreignKey: "UserId", onDelete: "CASCADE" });
Bus.hasMany(Device, { foreignKey: "BusId", onDelete: "CASCADE" });
Company.hasMany(Bus, { foreignKey: "CompanyId", onDelete: "CASCADE" });
Multimedia.belongsToMany(Category, {
  through: "media_categories",
  onDelete: "CASCADE",
});
Category.belongsToMany(Multimedia, {
  through: "media_categories",
  onDelete: "CASCADE",
});
Company.belongsToMany(Promotion, {
  through: "company_promotions",
  onDelete: "CASCADE",
});
Promotion.belongsToMany(Company, {
  through: "company_promotions",
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
app.use(express.static(path.join(__dirname, "public")));

// Routes
const routes = fs.readdirSync(path.join(__dirname, "routes"), {
  encoding: "utf-8",
});

// Inicializar rutas
routes.forEach((route) => {
  app.use(`/api/${route.split(".")[0]}`, require(`./routes/${route}`));
});

// Manejo de errores
app.use(httpErrors);

module.exports = app;
