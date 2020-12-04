const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, TEXT, INTEGER, UUID, UUIDV4 } = Sequelize;
const Books = require('./Books');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/bookclub'
);

const Book = conn.define('book', {
  apiId: {
    type: STRING,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  isCurrent: {
    type: BOOLEAN,
    defaultValue: false,
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
    type: STRING(40),
  },
  bio: {
    type: TEXT,
  },
  imageUrl: {
    type: STRING,
    defaultValue: ``,
  },

  genre: {
    type: STRING,
  },
});

// define associations

//
const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });
  await Promise.all(
    Books.map((book) =>
      Book.create({
        title: book.title,
        apiId: book.apiId,
        isCurrent: book.isCurrent,
      })
    )
  );
};

module.exports = {
  syncAndSeed,
  Member,
  Review,
  Book,
};
