const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const User = db.define(
  'user',
  {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    created_date: {
      type: Sequelize.DATE,
    },
    password: {
      type: Sequelize.STRING,
    },
    accountType: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: 'users',
  }
);

module.exports = User;
