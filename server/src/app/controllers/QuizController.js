const Quiz = require('../../model/quiz.model');
const Exercise = require('../../model/exercise.model');
const { Op } = require('sequelize');

class QuizController {
  // [GET] /quiz
  async index(req, res) {
    try {
      const quiz = await Quiz.findAll();
      return res.json(quiz);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  async store_option(req, res) {
    let exercises = [];
    let data = req.body.data;
    // console.log(data);
    for (const i in data) {
      if (data[i].answer === 'lose weight') {
        const ex = await Exercise.findAll({
          where: {
            exName: {
              [Op.or]: ['jumping jacks', 'Push up'],
            },
          },
        });
        for (const j in ex) {
          if (ex[j].dataValues) {
            exercises.push(ex[j].dataValues);
          }
        }
      }
    }
    console.log('36: ', exercises);
    return res.send(exercises);
  }
}
module.exports = new QuizController();
