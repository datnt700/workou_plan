const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const Exercise = db.define(
  'Exercise',
  {
    exId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exName: {
      type: DataTypes.STRING,
    },
    set: {
      type: DataTypes.INTEGER,
    },
    rep: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    muscleGroup: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: 'Exercise',
  }
);

module.exports = Exercise;
