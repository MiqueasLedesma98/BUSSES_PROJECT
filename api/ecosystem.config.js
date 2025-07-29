require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      script: "./bin/www",
      instances: process.env.INSTANCES,
      exec_mode: "cluster",
      autorestart: true,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
