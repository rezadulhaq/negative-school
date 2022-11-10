'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Namanya harus diisi ya kak" 
        },
        notNull: {
          args: true,
          msg: "Namanya harus diisi ya kak" 
        },
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Foto harus diisi ya kak" 
        },
        notNull: {
          args: true,
          msg: "Foto harus diisi ya kak" 
        },
      }
    },
    UserId: DataTypes.INTEGER,
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Umur harus diisi ya kak" 
        },
        notNull: {
          args: true,
          msg: "Umur harus diisi ya kak" 
        },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gender harus diisi ya kak"
        },
        notNull: {
          args: true,
          msg: "Gender harus diisi ya kak"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};