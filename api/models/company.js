const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Company = sequelize.define(
  "Company",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, version: false }
);

module.exports = { Company };
