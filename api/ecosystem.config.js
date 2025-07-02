module.exports = {
  apps: [
    {
      name: "Veotrans",
      watch: true,
      script: "./app.js",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
