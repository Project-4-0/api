"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Monitoring extends Model {
    static associate(models) {
      Monitoring.belongsTo(models.Box, {
        foreignKey: "BoxID",
        as: "Box",
      });
    }
  }
  Monitoring.init(
    {
      MonitoringID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      BoxID: DataTypes.STRING,
      SDCapacity: DataTypes.STRING,
      BatteryStatus: DataTypes.BOOLEAN,
      BatteryPercentage: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Monitoring",
      freezeTableName: true,
    }
  );
  return Monitoring;
};
