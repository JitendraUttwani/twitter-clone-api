
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    // connection: process.env.POSTGRESQL_DATABASE_URL,
    connection: {
      connectionString: process.env.POSTGRESQL_DATABASE_URL,
      host: process.env.POSTGRESQL_HOST,
      port: process.env.POSTGRESQL_PORT,
      user: process.env.POSTGRESQL_USER,
      database: process.env.POSTGRESQL_DATABASE,
      password: process.env.POSTGRESQL_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    // connection: {
    //   host:     process.env.POSTGRESQL_HOST,
    //   database: process.env.POSTGRESQL_DATABASE,
    //   user:     process.env.POSTGRESQL_USER,
    //   password: process.env.POSTGRESQL_PASSWORD
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
