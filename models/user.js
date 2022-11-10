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
      // define association here
      User.hasOne(models.Profile);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email harus diisi"
          },
          notNull: {
            args: true,
            msg: "Email harus diisi"
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password harus diisi"
          },
          notEmpty: {
            args: true,
            msg: "Password harus diisi"
          }
        }
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    let saltPassword = bcrypt.genSaltSync(5)
    let hashPassword = bcrypt.hashSync(instance.password, saltPassword);
    instance.password = hashPassword;
    // instance.status = false;
  });
  return User;
};
