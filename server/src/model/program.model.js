const { DataTypes } = require('sequelize');
const db = require('./index');
const Exercise = require('../model/exercise.model');

const Program = db.define(
  'workoutProgram',
  {
    workoutId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameWorkout: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.DATE,
    },
    intensity: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'workoutProgram',
  }
);

module.exports = Program;
