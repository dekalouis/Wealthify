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
      Company.belongsTo(models.Category);
      Company.belongsToMany(models.User, {

        through: sequelize.models.Investment,
      })

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
