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
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["eng", "esp"]],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["music", "movie"]],
      },
    },
  },
  { timestamps: true, version: false }
);

module.exports = { Category };
