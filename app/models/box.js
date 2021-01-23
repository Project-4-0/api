"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    static associate(models) {
      //   Box.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   Box.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  Box.init(
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
      modelName: "Box",
      freezeTableName: true,
    }
  );
  return Box;
};
