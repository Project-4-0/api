"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorBox extends Model {
    static associate(models) {
      // SensorBox33.belongsTo(models.Box, {
      //   foreignKey: 'boxID',
      //   as: 'Box'
      // });
      //   SensorBox33.belongsToMany(models.Box, {
      //     through: "SensorBox33",
      //     as: "Box",
      //     foreignKey: "BoxID",
      //   });
      // SensorBox.belongsToMany(models.Sensor, {
      //     through: "SensorBox33",
      //     as: "Sensor",
      //     foreignKey: "SensorID",
      //   });
      SensorBox.belongsTo(models.Sensor, {
        through: "SensorBox",
        as: "Sensor",
        foreignKey: "SensorID",
      });
      SensorBox.belongsTo(models.Box, {
        through: "SensorBox",
        as: "Box",
        foreignKey: "BoxID",
      });
    }
  }
  SensorBox.init(
    {},
    {
      sequelize,
      modelName: "SensorBox",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return SensorBox;
};
