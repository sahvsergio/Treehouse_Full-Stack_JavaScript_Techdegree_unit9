"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Course, {
        foreignKey: {
          fieldName: "userId",
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A first name  is required",
          },
          notNull:{
            msg:"A first name is required"
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "last name  is required",
          },
          notNull:{
            msg:'Last Name is required'
          }
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email address you entered already exists",
        },
        validate: {
          notNull: {
            msg: "Email  is required",
          },
          notEmpty: {
            msg: "Please provide a valid e-mail address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          if (val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          }
        },
        validate: {
          notEmpty: {
            msg: "password  is required",
          },
          notNull:{
            msg:"Password is required",
          }
          },
        },
     
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
