"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: "UserId" });
      User.belongsToMany(models.Company, {
        through: sequelize.models.Investment,
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email " },
          notNull: { msg: "Email tidak boleh kosong" },
          notEmpty: { msg: "Email tidak boleh kosong" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: "Password harus 6 karakter",
          },
          notNull: { msg: "Password tidak boleh kosong" },
          notEmpty: { msg: "Password tidak boleh kosong" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["admin", "user"]],
            msg: "Role harus 'admin' or 'user'",
          },
          notNull: { msg: "Role tidak boleh kosong" },
          notEmpty: { msg: "Role tidak boleh kosong" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          const salt = bcrypt.genSaltSync(10);
          instance.password = bcrypt.hashSync(instance.password, salt);
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
