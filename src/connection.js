const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'dindin',
        password: '1207',
        port: 5432,
    },
})

module.exports = knex;