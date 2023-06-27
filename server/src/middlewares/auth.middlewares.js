const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenToken = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) {
      return res.send('Tạo access token không thành công, vui lòng thử lại.');
    }
    next();
  });
};

module.exports = { authenToken };
