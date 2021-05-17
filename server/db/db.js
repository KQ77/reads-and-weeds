// const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
// const { STRING, TEXT, INTEGER, UUID, UUIDV4 } = Sequelize;
// const Books = require('./Books');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/bookclub',
  { logging: true }
);

module.exports = {
  conn,
};
