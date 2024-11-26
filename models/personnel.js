'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personnel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Personnel.init({
    fName: DataTypes.STRING,
    mName: DataTypes.STRING,
    lName: DataTypes.STRING,
    core: DataTypes.STRING,
    armyNumber: DataTypes.STRING,
    hashedArmyNo: DataTypes.STRING,
    rank: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
    rememberToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personnel',
    tableName: 'personnels', // Specify the actual table name
  });
  return Personnel;
};