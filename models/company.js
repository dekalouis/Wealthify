"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Category);
      Company.belongsToMany(models.User, {
        through: models.Investment,
        foreignKey: "CompanyId",
        otherKey: "UserId",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      location: DataTypes.STRING,
      email: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
