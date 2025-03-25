const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Promotion = sequelize.define(
  "Promotion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    path: { type: DataTypes.STRING, allowNull: false },
    // isBanner: { }, // TODO: agregar propiedad para indicar si es un banner o no, tambien falta el lenguaje de la promoción
    views: { type: DataTypes.BIGINT, defaultValue: 0 },
    description: { type: DataTypes.STRING },
    expirationDate: { type: DataTypes.DATE, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true, version: false }
);

Promotion.prototype.checkExpiration = function () {
  if (new Date() > this.expirationDate) {
    this.isActive = false;
    this.save();
  }
};

module.exports = { Promotion };
