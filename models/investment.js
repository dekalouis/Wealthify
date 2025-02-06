"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.User, { foreignKey: "UserId" });
      Investment.belongsTo(models.Company, { foreignKey: "CompanyId" });
    }

    get formattedData() {
      return {
        name: this.name,
        description: this.description,
        type: this.investmentType,
        amount: this.amount,
        companyName: this.Company?.name || "N/A",
        companyLocation: this.Company?.location || "N/A",
      };
    }
  }
  Investment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Investment name cannot be empty" },
          len: {
            args: [3, 255],
            msg: "Investment name must be between 3 and 255 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      investmentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Investment type is required" },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Investment amount is required" },
          min: {
            args: [10000],
            msg: "Investment amount must be at least Rp 10.000",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CompanyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Company is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Investment",
    }
  );
  return Investment;
};
