const Sequelize = require('sequelize');
const { STRING, ENUM, INTEGER, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/bookclub'
);

const Book = conn.define('book', {
  title: {
    type: STRING,
    allowNull: false,
  },
});
const Review = conn.define('review', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    max: 10,
    min: 1,
  },
});
const Member = conn.define('member', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
  },
});

const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });
  const [Kate, Melissa] = await Promise.all(
    ['Kate', 'Melissa'].map((name) => Member.create({ name }))
  );
};

module.exports = {
  syncAndSeed,
  Member,
  Review,
  Book,
};
