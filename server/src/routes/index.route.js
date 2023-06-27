const usersRouter = require('./users.route');
const authRouter = require('./auth.route');
const quizRouter = require('./quiz.route');
const programRouter = require('./program.route');

function route(app) {
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/quiz', quizRouter);
  app.use('/program', programRouter);
}

module.exports = route;
