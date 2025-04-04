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
    number: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true },
    },
  },
  { version: false }
);

module.exports = { Version };
