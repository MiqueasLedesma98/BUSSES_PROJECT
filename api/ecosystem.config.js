module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: false,
      script: "./bin/www",
      instances: 10,
      exec_mode: "cluster",
      env: {
        PORT: 4050,
      },
    },
  ],
};
