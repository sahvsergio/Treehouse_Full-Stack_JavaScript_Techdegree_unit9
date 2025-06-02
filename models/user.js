'use strict';
const bcrypt = require('bcrypt');


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
     

        User.hasMany(models.Course,{foreignKey:'userId'})
 
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
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "last name  is required",
          },
        },
      },

      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email address you entered already exists",
        },
        validate: {
          notEmpty: {
            msg: "Email  is required",
          },
          isEmail: {
            msg: "Please provide a valid e-mail address",
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password  is required",
          },
        },
      },

      confirmedPassword:{
        type:DataTypes.STRING,
        allowNull:false,
        set(val){
          if(val===this.password){
            const hashedPassword=bcrypt.hashSync(val, 10);
            this.setDataValue('confirmedPassword', hashedPassword)}

          },
        validate:{
          notNull:{
            msg:"Both passwords must match"
          },
        }


        }


    
    
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
