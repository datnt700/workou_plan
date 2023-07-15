const usersRouter = require('./users.route');
const authRouter = require('./auth.route');
const quizRouter = require('./quiz.route');
const programRouter = require('./program.route');
const answerRoute = require('./answer.route');
const exerciseRoute = require('./exercise.route');
function route(app) {
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/quiz', quizRouter);
  app.use('/program', programRouter);
  app.use('/answer', answerRoute);
  app.use('/exercise', exerciseRoute);
}

module.exports = route;
