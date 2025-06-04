"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User,{
        foreignKey:'userId'
      })
    }
  }
  Course.init(
    {
      title: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            msg:"Title cannot be empty"
          }
        }
      },


      description:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notEmpty:{
            msg:"Description cannot be empty "
          }
        }
      },

      estimatedTime: {
        type:DataTypes.STRING,
        
        
      },
      materialsNeeded: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
 
  return Course;
};
