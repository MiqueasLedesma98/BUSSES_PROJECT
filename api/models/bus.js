const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Bus = sequelize.define(
  "Bus",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: { type: DataTypes.INTEGER, validate: { isNumeric: true } },
    state: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  { timestamps: true, version: false }
);

module.exports = { Bus };
