module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      script: "./bin/www",
      instances: process.env.NODE_ENV === "MAIN_SERVER" ? 10 : "max",
      exec_mode: "cluster",
      autorestart: true,
      env: {
        PORT: 4050,
      },
    },
  ],
};
