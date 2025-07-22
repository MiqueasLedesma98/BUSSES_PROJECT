module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      script: "./bin/www",
      instances: 10,
      exec_mode: "cluster",
      env: {
        PORT: 4050,
      },
    },
  ],
};
