"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoxUser extends Model {
    static associate(models) {
      //   BoxUser.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   BoxUser.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  BoxUser.init(
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
      modelName: "BoxUser",
      freezeTableName: true,
    }
  );
  return BoxUser;
};
