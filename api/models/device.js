const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Device = sequelize.define(
  "Device",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    CompanyId: {
      type: DataTypes.UUID,
      allowNull: false, // si la relación es obligatoria
    },
    state: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), default: "ACTIVE" },
    seat: { type: DataTypes.INTEGER, required: false },
    bus: { type: DataTypes.INTEGER, required: false },
  },
  { timestamps: true, version: false }
);

module.exports = { Device };
