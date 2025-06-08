module.exports = {
  apps: [
    {
      name: "Veotrans",
      script: "./app.js",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
