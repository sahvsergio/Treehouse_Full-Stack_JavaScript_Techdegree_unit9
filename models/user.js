'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A first name  is required"
          },
        },
      },


      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        notEmpty: {
          msg: "last name  is required",
        }
      }
    },   

      
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        unique: true,
        notEmpty: {
          msg: "Email  is required",
        isEmail: {
          msg: "Please provide a valid e-mail address",
        }
        },
      }


        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        notEmpty: {
          msg: "password  is required",
        }
      }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
