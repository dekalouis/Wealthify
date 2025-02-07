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

    static async getTotalInvestmentByUser(userId) {
      const totalInvestment = await Investment.sum("amount", {
        where: { UserId: userId },
      });

      if (totalInvestment === null) {
        return 0;
      } else {
        return totalInvestment;
      }
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
          notEmpty: { msg: "Investment tidak boleh kosong" },
          len: {
            args: [3, 255],
            msg: "Investment harus berisi 3-255 karakter",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description tidak boleh kosong" },
        },
      },
      investmentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Investment tidak boleh kosong" },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Investment tidak boleh kosong" },
          min: {
            args: [10000],
            msg: "Investment haurs minimal Rp 10.000",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CompanyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Company harus dipilih" },
        },
      },
    },
    {
      sequelize,
      modelName: "Investment",
      hooks: {
        beforeSave: (investment) => {
          investment.investmentType =
            investment.investmentType.charAt(0).toUpperCase() +
            investment.investmentType.slice(1).toLowerCase();
        },
      },
    }
  );
  return Investment;
};
