const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const ans_mode = require('./answer_mode.model');
const Mode_Workout = require('./mode_workout.model');
const Exercise = require('./exercise.model');
const Exercise_Mode = db.define(
  'ex_mode',
  {
    exerciseExid: {
      type: DataTypes.INTEGER,
      references: {
        model: Exercise,
        key: 'exid',
      },
    },
    modeWorkoutModeid: {
      type: DataTypes.INTEGER,
      references: {
        model: Mode_Workout,
        key: 'modeid',
      },
    },
  },
  {
    tableName: 'ex_mode',
  }
);
Exercise.belongsToMany(Mode_Workout, {
  through: Exercise_Mode,
});
Mode_Workout.belongsToMany(Exercise, {
  through: Exercise_Mode,
});
module.exports = Exercise_Mode;
