const knexMysql = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'jorgem',
        password: 'JSC1909',
        database: 'test'
    },
    pool: {min: 0, max: 10}
})

module.exports = { knexMysql };