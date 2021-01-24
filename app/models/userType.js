"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    static associate(models) {
      //   UserType.belongsTo(models.Classroom, {
      //     foreignKey: 'classroom_id',
      //     as: 'classroom'
      //   });
      //   UserType.belongsToMany(models.Course, {
      //     through: 'UserTypeCourse',
      //     as: 'courses',
      //     foreignKey: 'UserType_id'
      //   });
    }
  }
  UserType.init(
    {
      UserTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserTypeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserType",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return UserType;
};
