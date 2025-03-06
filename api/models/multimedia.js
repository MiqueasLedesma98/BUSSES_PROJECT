const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Multimedia = sequelize.define(
  "Media",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    title: { type: DataTypes.UUID, allowNull: false },
    lang: { type: DataTypes.ENUM("ESP", "ENG") },
    type: { type: DataTypes.ENUM("MOVIE", "MUSIC") },
    description: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
      allowNull: false,
    },
    duration: { type: DataTypes.STRING, allowNull: false },
    views: { type: DataTypes.BIGINT, defaultValue: 0 },
    path: { type: DataTypes.STRING, allowNull: false },
  },

  { timestamps: true, version: false }
);

module.exports = { Multimedia };
