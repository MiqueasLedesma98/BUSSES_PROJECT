const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Device = sequelize.define(
  "Device",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    state: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), default: "ACTIVE" },
  },
  { timestamps: true, version: false }
);

module.exports = { Device };
