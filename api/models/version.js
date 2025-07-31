const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Version = sequelize.define(
  "Version",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isAplicated: { type: DataTypes.BOOLEAN, default: false },
    models: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["promotion", "multimedia", "company", "devices"]],
      },
    },
    number: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      validate: { isNumeric: true },
    },
  },
  { version: false }
);

module.exports = { Version };
