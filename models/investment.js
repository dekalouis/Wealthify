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
      name: DataTypes.STRING,
      description: DataTypes.TEXT,

      investmentType: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CompanyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Investment",
    }
  );
  return Investment;
};
