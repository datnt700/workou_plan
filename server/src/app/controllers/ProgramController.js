const Program = require('../../model/program.model');

class ProgramController {
  // [GET] /quiz
  async index(req, res) {
    try {
      const program = await Program.findAll();
      return res.json(program);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  //   async store_option(req, res) {
  //     let data = req.body;
  //     console.log(data);
  //     res.json({ message: 'Data received successfully' });
  //   }
}
module.exports = new ProgramController();
