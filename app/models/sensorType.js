"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorType extends Model {
    static associate(models) {}
  }
  SensorType.init(
    {
      SensorTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: DataTypes.STRING,
      Unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SensorType",
      freezeTableName: true,
    }
  );
  return SensorType;
};
