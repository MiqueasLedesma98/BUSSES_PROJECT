const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Promotion = sequelize.define(
  "Promotion",
  {
    title: { allowNull: true, type: DataTypes.STRING },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    path: { type: DataTypes.STRING, allowNull: false },
    path_secondary: { type: DataTypes.STRING, allowNull: true },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["banner", "video"]],
      },
    },

    type_banner: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["welcome_banner", "bottom_bar", "left_bar", "carousel_banner"]],
      },
    },

    lang: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["esp", "eng"]],
      },
    },
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
