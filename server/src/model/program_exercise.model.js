const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const Program = require('./program.model');
const Exercise = require('./exercise.model');
const Pro_ex = db.define(
  'program_exercise',
  {
    exerciseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Exercise,
        key: 'exId',
      },
    },
    programId: {
      type: DataTypes.INTEGER,
      references: {
        model: Program,
        key: 'workoutId',
      },
    },
  },
  {
    tableName: 'program_exercise',
  }
);
Program.belongsToMany(Exercise, { through: Pro_ex });
Exercise.belongsToMany(Program, { through: Pro_ex });
module.exports = Pro_ex;
