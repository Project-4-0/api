"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorBox33 extends Model {
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
      //   SensorBox33.belongsToMany(models.Sensor, {
      //     through: "SensorBox33",
      //     as: "Sensor",
      //     foreignKey: "SensorID",
      //   });
    }
  }
  SensorBox33.init(
    {
      BoxID: DataTypes.INTEGER,
      SensorID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SensorBox33",
      freezeTableName: true,
    }
  );
  return SensorBox33;
};
