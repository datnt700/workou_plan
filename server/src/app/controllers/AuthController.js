const { client } = require('../../config/database');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { authenToken } = require('../../middlewares/auth.middlewares');
dotenv.config();
let refreshTokens = [];

class AuthController {
  logout(req, res) {
    const refreshToken = req.body.token;

    refreshTokens = refreshTokens.filter((ref) => ref !== refreshToken);
    res.sendStatus(200);
  }

  // [POST] /auth/register
  async register(req, res) {
    // retrieve the user’s form values (destructuring)
    const { email, password } = req.body;
    console.log('21:', req.body.email);

    const dateTimeObject = new Date();
    const date = dateTimeObject.toDateString();
    try {
      // Check if the email already exists in the database
      const checkQuery = 'SELECT * FROM users WHERE email = $1';
      const result = client.query(checkQuery, [email]);

      if ((await result).rowCount > 0) {
        return res.status(400).json({ error: 'Email is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert a new user into the PostgreSQL database
      const query =
        'INSERT INTO users (email, password, created_date) VALUES ($1, $2, $3)';
      const values = [email, hashedPassword, date];
      await client.query(query, values);
      res.send({
        code: 200,
        success: 'user registered sucessfully',
      });
      // how to Save user details to the PostgreSQL database in Nodejs
    } catch (error) {
      res.send({
        code: 400,
        failed: 'error ocurred',
        error: error.message,
      });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    const { email, password } = req.body;

    client.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      async (error, results) => {
        if (error) {
          return res.send({
            code: 400,
            failed: 'error ocurred',
            error: error.message,
          });
        } else {
          if (results.rowCount > 0) {
            const comparision = await bcrypt.compare(
              password,
              results.rows[0].password
            );
            if (comparision) {
              const accessToken = jwt.sign(
                { email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: '30s',
                }
              );
              const refreshToken = jwt.sign(
                { email },
                process.env.REFRESH_TOKEN_SECRET
              );
              refreshTokens.push(refreshToken);
              await client.query(
                'INSERT INTO users (refresh_token) VALUES ($1)',
                [refreshToken],
                (err, result) => {
                  if (err) console.log(err);
                }
              );
              return res.send({
                code: 200,
                success: 'login sucessfull',
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            } else {
              return res.send({
                code: 204,
                success: 'Email and password does not match',
              });
            }
          } else {
            return res.send({
              code: 206,
              success: 'Email does not exits',
            });
          }
        }
      }
    );
  }

  async refreshToken(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      console.log(err, data);
      if (err) res.sendStatus(403);
      const accessToken = jwt.sign(
        { username: data.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '500s',
        }
      );
      res.json({ accessToken });
    });
  }
}

module.exports = new AuthController();
