const Answer = require('../../model/answer.model');

const { Op } = require('sequelize');

class AnswerController {
  // [GET] /answer
  async index(req, res) {
    try {
      const answer = await Answer.findAll();
      return res.json(answer);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }
}
module.exports = new AnswerController();
