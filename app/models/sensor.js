"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    static associate(models) {
      //   Sensor.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   Sensor.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  Sensor.init(
    {
      LocationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      BoxUserID: DataTypes.STRING,
      Latitude: DataTypes.STRING,
      Longitude: DataTypes.STRING,
      StartDate: DataTypes.DATE,
      EndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Sensor",
      freezeTableName: true,
    }
  );
  return Sensor;
};
