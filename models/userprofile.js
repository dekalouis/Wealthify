"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserProfile.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama lengkap tidak boleh kosong" },
          notEmpty: { msg: "Nama lengkap tidak boleh kosong" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number tidak boleh kosong" },
          notEmpty: { msg: "Phone Number tidak boleh kosong" },
          isNumeric: { msg: "Phone Number hanya boleh angka" },
          len: {
            args: [10, 15],
            msg: "Phone Number harus 10 - 15 karakter",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Alamat tidak boleh kosong" },
          notEmpty: { msg: "Alamat tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );

  return UserProfile;
};
