const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    lang: { type: DataTypes.ENUM("eng", "esp") },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("music", "movie") },
  },
  { timestamps: true, version: false }
);

module.exports = { Category };
