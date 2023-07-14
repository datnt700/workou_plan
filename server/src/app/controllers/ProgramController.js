const Program = require('../../model/program.model');
const Exercise = require('../../model/exercise.model');
const Pro_ex = require('../../model/program_exercise.model');
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

  async getProgramWithExercise(req, res) {
    try {
      const programExercises = await Pro_ex.findAll({
        include: [
          {
            model: Program,
            attributes: ['workoutId', 'nameWorkout'],
          },
          {
            model: Exercise,
            attributes: ['exId', 'exName'],
          },
        ],
      });
      for (const program of programExercises) {
        console.log('ProgramId: ', program.Program.workoutId);
        console.log('Program Name: ', program.Program.nameWorkout);
        console.log('Exercise Id: ', program.Exercise.exId);
        console.log('Ex Name: ', program.Exercise.exName);
      }
    } catch (error) {
      console.error('Error retrieving user product data:', error);
    }
  }

  async store_option(req, res) {
    let data = req.body;
    console.log(data);
    res.json({ message: 'Data received successfully' });
  }
}
module.exports = new ProgramController();
