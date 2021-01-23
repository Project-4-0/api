"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorBox extends Model {
    static associate(models) {
      //   SensorBox.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   SensorBox.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  SensorBox.init(
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
      modelName: "SensorBox",
      freezeTableName: true,
    }
  );
  return SensorBox;
};
