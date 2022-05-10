const { knexMysql } = require('./options/mariaDB');
const { knexSqLite } = require('./options/sqlite');

const createTable = async knex => {
    await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('title');
        table.integer('price');
        table.string('thumbnail');
      });
   }

const createTableChat = async knex => {
    await knex.schema.createTable('chat', table => {
        table.increments('id').primary();
        table.string('email');
        table.string('messages');
        table.string('date');
    })
}

//Create tables in databases
createTable(knexMysql);
createTable(knexSqLite);
createTableChat(knexMysql);
createTableChat(knexSqLite);