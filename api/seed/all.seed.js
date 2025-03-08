const { User } = require("../models");

const seedUsers = async () => {
  try {
    const users = [
      {
        name: "ADMIN",
        email: "admin@admin.com",
        password: "123456a",
        role: "admin",
      },
    ];

    await User.bulkCreate(users);
    console.log("✔️ Usuarios insertados correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error insertando usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
