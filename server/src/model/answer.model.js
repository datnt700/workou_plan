const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const Quiz = require('./quiz.model');
const { Model_Workout } = require('./mode_workout.model');
const Answer = db.define(
  'answer',
  {
    ansid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'answer',
  }
);
Quiz.hasMany(Answer, {
  foreignKey: 'quizid',
});
Answer.belongsTo(Quiz, { foreignKey: 'quizid' });

module.exports = Answer;
