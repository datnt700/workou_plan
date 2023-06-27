const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'datbeo09',
  database: 'workoutdb',
});

client.query((err, res) => {
  if (!err) {
    console.log('Database is connected ... nn');
    // console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
});

module.exports = { client };
