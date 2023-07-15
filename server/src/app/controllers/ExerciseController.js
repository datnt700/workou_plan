const Exercise = require('../../model/exercise.model');

const { Op } = require('sequelize');

class ExerciseController {
  // [GET] /exercise
  async index(req, res) {
    try {
      const exercise = await Exercise.findAll();
      return res.json(exercise);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  // [POST] /exercise/create

  async create(req, res) {
    const exercise = req.body;
    Exercise.create(exercise)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
module.exports = new ExerciseController();
