"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      //   Location.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   Location.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  Location.init(
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
      modelName: "Location",
      freezeTableName: true,
    }
  );
  return Location;
};
