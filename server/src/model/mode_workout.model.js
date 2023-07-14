const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const { Answer } = require('./answer.model');

const Mode_Workout = db.define(
  'mode_workout',
  {
    modeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'mode_workout',
  }
);

module.exports = Mode_Workout;
