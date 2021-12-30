'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // noinspection JSUnusedLocalSymbols
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
        delete this.dataValues.password;
        return this.dataValues;
    }

  }

  // noinspection JSUnresolvedVariable
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    last_login_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    // defaultScope: {
    //   attributes: { exclude: ['password'] },
    // },
    // scopes: {
    //   withoutPassword: {
    //     attributes: {exclude: ['password']},
    //   }
    // },

  });
  return User;
};
