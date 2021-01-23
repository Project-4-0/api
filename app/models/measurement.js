"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    static associate(models) {
      Measurement.belongsTo(models.Box, {
        foreignKey: "BoxID",
        as: "Box",
      });
      Measurement.belongsTo(models.Sensor, {
        foreignKey: "SensorID",
        as: "Sensor",
      });
    }
  }
  Measurement.init(
    {
      MeasurementID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      BoxID: DataTypes.STRING,
      SensorID: DataTypes.STRING,
      Value: DataTypes.STRING,
      TimeStamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Measurement",
      freezeTableName: true,
    }
  );
  return Measurement;
};
