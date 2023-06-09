const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const Quiz = db.define(
  'quiz',
  {
    qid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questions: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'quiz',
  }
);

module.exports = Quiz;
