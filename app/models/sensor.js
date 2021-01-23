"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    static associate(models) {
      Sensor.belongsToMany(models.Box, {
        through: "SensorBox",
        as: "Box",
        foreignKey: "SensorID",
      });
      Sensor.belongsTo(models.SensorType, {
        foreignKey: "SensorTypeID",
        as: "SensorType",
      });
    }
  }
  Sensor.init(
    {
      SensorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: DataTypes.STRING,
      SensorTypeID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sensor",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Sensor;
};
