const { User, Category } = require("../models");
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
    ];

    const categories = [
      { name: "Acción", lang: "esp", description: "N/A" },
      { name: "action", lang: "eng", description: "N/A" },
    ];

    await User.bulkCreate(users);
    console.log("✔️ Usuarios insertados correctamente.");

    await Category.bulkCreate(categories);
    console.log("✔️ Categorias insertadas correctamente.");

    process.exit();
  } catch (error) {
    console.error("❌ Error insertando usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
