const Quiz = require('../../model/quiz.model');
const Exercise = require('../../model/exercise.model');
const Answer_Mode = require('../../model/answer_mode.model');
const Exercise_Mode = require('../../model/exercise_mode.model');
const Mode = require('../../model/mode_workout.model');

const { Op } = require('sequelize');
const Answer = require('../../model/answer.model');

class QuizController {
  // [GET] /quiz
  async index(req, res) {
    try {
      const quiz = await Quiz.findAll({
        include: [Answer],
      });
      return res.json(quiz);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  async store_option(req, res) {
    let answers = [];
    let data = req.body.data;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
      }
      answers.push(value);
    }
    try {
      const ans = await Answer.findAll({
        where: {
          answer: answers,
        },
        include: [
          {
            model: Mode,
            include: [
              {
                model: Exercise,
              },
            ],
          },
        ],
      });
      console.log(ans);
      return res.json(ans);
    } catch (error) {
      console.log('error: ', error);
    }

    // for (const i in data) {
    //   if (data[i] === 'lose weight') {
    //     const ex = await Exercise.findAll({
    //       where: {
    //         exName: {
    //           [Op.or]: ['jumping jacks', 'Push up'],
    //         },
    //       },
    //     });
    //     for (const j in ex) {
    //       if (ex[j].dataValues) {
    //         exercises.push(ex[j].dataValues);
    //       }
    //     }
    //   }
    // }
    // return res.send(exercises);
  }
}
module.exports = new QuizController();
