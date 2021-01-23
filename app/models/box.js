"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    static associate(models) {
      Box.belongsToMany(models.Sensor, {
        through: "SensorBox",
        as: "sensors",
        foreignKey: "BoxID",
      });
    }
  }
  Box.init(
    {
      BoxID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      MacAdress: DataTypes.STRING,
      Name: DataTypes.STRING,
      Comment: DataTypes.STRING,
      Active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Box",
      freezeTableName: true,
    }
  );
  return Box;
};
