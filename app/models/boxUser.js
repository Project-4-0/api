"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoxUser extends Model {
    static associate(models) {
      BoxUser.belongsTo(models.Box, {
        foreignKey: "BoxID",
        as: "Box",
      });
      BoxUser.belongsTo(models.User, {
        foreignKey: "UserID",
        as: "User",
      });
    }
  }
  BoxUser.init(
    {
      BoxUserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // BoxID: DataTypes.INTEGER,
      // UserID: DataTypes.INTEGER,
      StartDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      EndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BoxUser",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return BoxUser;
};
