require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      script: "./bin/www",
      instances: 20,
      exec_mode: "cluster",
      autorestart: true,
      env: {
        PORT: 4050,
        NODE_ENV: "MAIN_SERVER",
      },
    },
  ],
};
