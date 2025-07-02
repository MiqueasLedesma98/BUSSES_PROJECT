module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: false,
      script: "./bin/www",
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 4050,
      },
    },
  ],
};
