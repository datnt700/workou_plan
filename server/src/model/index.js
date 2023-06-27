const { client } = require('../config/database');
const Sequelize = require('sequelize');

const db = new Sequelize(client.database, client.user, client.password, {
  host: client.HOST,
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  operatorsAliases: false,

  //   max: maximum number of connection in pool
  // min: minimum number of connection in pool
  // idle: maximum time, in milliseconds, that a connection can be idle before being released
  // acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
