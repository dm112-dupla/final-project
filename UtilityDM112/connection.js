module.exports = connection = require('knex')({
  client: 'pg',
  connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'dm112_db'
  }
});