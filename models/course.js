'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User)
      Course.belongsTo(models.Category)
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.beforeCreate(function(course) {
    let {description} = course
    // let atime = new Date().getTime()
  
    if(description){
      course.description = `Description : ${description}`
    }
  })
  return Course;
};