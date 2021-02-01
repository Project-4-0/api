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
      BoxID: DataTypes.INTEGER,
      SdCapacity: DataTypes.STRING,
      AmountSatellite: DataTypes.STRING,
      BatteryPercentage: DataTypes.DOUBLE,
      Temperature: DataTypes.STRING,
      TimeStamp: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Monitoring",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Monitoring;
};
