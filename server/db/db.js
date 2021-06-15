// const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
// const { STRING, TEXT, INTEGER, UUID, UUIDV4 } = Sequelize;
// const Books = require('./Books');
const options =
  process.env.NODE_ENV === 'production'
    ? {
        dialect: 'postgres',
        ssl: true,
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : { logging: false };
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/bookclub',
  options
);

module.exports = {
  conn,
};
