require("dotenv").config();
const { User, Category, Company } = require("../models");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
  try {
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

    const companies = [{ name: "Pantene" }];

    if (process.env.NODE_ENV === "DEV") {
      await Company.bulkCreate(companies);
      console.log("✔️ Companias de testeo creadas");
    }

    const categories = [
      { name: "Acción", lang: "esp", description: "N/A", type: "movie" },
      { name: "action", lang: "eng", description: "N/A", type: "movie" },
    ];

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
