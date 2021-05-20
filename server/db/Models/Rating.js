const { conn } = require('../db');
const { UUID, UUIDV4, INTEGER, DECIMAL } = conn.Sequelize;

const Rating = conn.define('rating', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  rating: {
    type: DECIMAL,
    max: 10,
    min: 1,
  },
});

module.exports = Rating;
