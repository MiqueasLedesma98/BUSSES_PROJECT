require("dotenv").config();
const { User, Category, Company } = require("../models");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config");
const categories = require("./categories.json");

const seedUsers = async () => {
  try {
    await sequelize.authenticate();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("123456a", salt);

    const users = [
      {
        email: "admin@admin.com",
        name: "ADMIN",
        password,
        role: "admin",
      },
      {
        email: "buss1@gmail.com",
        name: "buss1",
        password,
        role: "user",
      },
    ];

    const companies = [];

    await Company.bulkCreate(companies);
    console.log("✔️ Companias de testeo creadas");

    await User.bulkCreate(users);
    console.log("✔️ Usuarios insertados correctamente.");

    await Category.bulkCreate(categories);
    console.log("✔️ Categorias insertadas correctamente.");

    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar datos", error);
    process.exit(1);
  }
};

seedUsers();
