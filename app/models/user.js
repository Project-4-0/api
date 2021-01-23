"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserType, {
        foreignKey: "UserTypeID",
        as: "UserType",
      });
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
      UserTypeID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};
