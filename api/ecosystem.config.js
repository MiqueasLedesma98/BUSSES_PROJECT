require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      ignore_watch: [
        "backup.sql",
        "temp_restore.sql",
        "node_modules",
        "logs",
        "media",
      ],
      script: "./bin/www",
      instances: process.env.INSTANCES,
      exec_mode: "cluster",
      autorestart: true,
      env: {
        PORT: process.env.PORT,
        HOST: process.env.HOST,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
