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
  }
  Investment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      InvestmentType: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Investment",
    }
  );
  return Investment;
};
