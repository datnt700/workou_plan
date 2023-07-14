const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const Answer = require('./answer.model');
const Mode_Workout = require('./mode_workout.model');

const Answer_Mode = db.define(
  'ans_mode',
  {
    answerAnsid: {
      type: DataTypes.INTEGER,
      references: {
        model: Answer,
        key: 'ansid',
      },
    },
    modeWorkoutModeid: {
      type: DataTypes.INTEGER,
      references: {
        model: Answer,
        key: 'modeid',
      },
    },
  },
  {
    tableName: 'ans_mode',
  }
);
Mode_Workout.belongsToMany(Answer, {
  through: Answer_Mode,
  // foreignKey: 'mode_id',
});
Answer.belongsToMany(Mode_Workout, {
  through: Answer_Mode,
  // foreignKey: 'answer_id',
});

module.exports = Answer_Mode;
