const { conn } = require('../server/db.js');
const { BOOLEAN, STRING, TEXT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;
const Books = require('../server/Books.js');
const Members = require('../server/Members.js');

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
const Rating = conn.define('rating', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  rating: {
    type: INTEGER,
    max: 10,
    min: 1,
  },
});
const Comment = conn.define('comment', {
  comment: {
    type: TEXT,
  },
});
const Member = conn.define('member', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING(40),
  },
  lastName: {
    type: STRING,
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
  faveBook: {
    type: STRING,
  },
  favePick: {
    type: STRING,
  },
});

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
  await Promise.all(
    Members.map((member) =>
      Member.create({
        firstName: member.firstName,
        lastName: member.lastName,
        genre: member.genre,
        faveBook: member.faveBook,
        favePick: member.favePick,
        imageUrl: member.imageUrl,
        bio: member.bio,
      })
    )
  );
};

module.exports = { Book, Rating, Comment, Member, syncAndSeed };
