"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //   User.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   User.belongsToMany(models.Course, {
      //     through: 'UserCourse',
      //     as: 'courses',
      //     foreignKey: 'User_id'
      //   });
    }
  }
  User.init(
    {
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Password: DataTypes.STRING,
      Email: DataTypes.STRING,
      Address: DataTypes.STRING,
      PostalCode: DataTypes.STRING,
      City: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
