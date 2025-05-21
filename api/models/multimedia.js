const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Multimedia = sequelize.define(
  "Media",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    lang: { type: DataTypes.ENUM("esp", "eng") },
    type: { type: DataTypes.ENUM("movie", "music") },
    description: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
      allowNull: false,
    },
    cover_path: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.STRING, allowNull: false },
    rate: { type: DataTypes.FLOAT, defaultValue: 0 },
    url_path: { type: DataTypes.STRING, allowNull: false },
    views: { type: DataTypes.BIGINT, defaultValue: 0 },
    year: { type: DataTypes.STRING, allowNull: false },
  },

  { timestamps: true, version: false }
);

module.exports = { Multimedia };
