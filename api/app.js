const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");

const { httpErrors } = require("./middlewares");

const { User, Multimedia } = require("./models");
const { sequelize, initializeDB } = require("./config/db");

const app = express();

// Conexión con la base de datos - Relaciones
// TODO: Realacionar los modelos / Configurar el modo de la DB

initializeDB();
// Middlewares
app.use(logger("dev"));
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
  app.use(`/${route.split(".")[0]}`, require(`./routes/${route}`));
});

// Manejo de errores
app.use(httpErrors);

module.exports = app;
