const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const route = require('./routes/index.route');
app.use(morgan('combined'));
var cors = require('cors');

const { client } = require('./config/database');
const db = require('./model');
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// middleware để xử lí form đc submit từ client
app.use(express.urlencoded({ extended: 'true' }));
// receive the form values as JSON
app.use(express.json());

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

client.connect();

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', error));
// hashing passwords
const bcrypt = require('bcryptjs');
