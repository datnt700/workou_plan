const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const Program = require('../model/program.model');
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

User.belongsTo(Program);

module.exports = User;
