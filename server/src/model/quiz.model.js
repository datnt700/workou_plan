const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const Quiz = db.define(
  'quiz',
  {
    qId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questions: {
      type: DataTypes.STRING,
    },
    choices: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: 'quiz',
  }
);

module.exports = Quiz;
