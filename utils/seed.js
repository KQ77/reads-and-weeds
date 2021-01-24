const { conn } = require('../server/db.js');
const { BOOLEAN, STRING, TEXT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;
const Books = require('../server/Books.js');
const { Suggestion } = require('../server/db/Suggestion.js');
const { Comment } = require('../server/Comment.js');
const Members = require('../server/Members.js');
const { Book } = require('../server/Book');
const { Member } = require('../server/Member');
const axios = require('axios');

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

//define associations
Comment.belongsTo(Book);
Book.hasMany(Comment);

Comment.belongsTo(Member);
Member.hasMany(Comment);

Suggestion.belongsTo(Member);
Member.hasMany(Suggestion);

const apiIds = [
  `PmpfDwAAQBAJ`,
  'RidvDwAAQBAJ',
  '9-GCDwAAQBAJ',
  `wKFaDwAAQBAJ`,
  `ey-BDwAAQBAJ`,
  `FkiSDwAAQBAJ`,
  `gt7EQgH8-b4C`,
  `dAzJCwAAQBAJ`,
  `rQumDwAAQBAJ`,
  'SUdfDwAAQBAJ',
];

const apiKey = 'AIzaSyCkkHyRp__65PWLfn50WMtKrIncdJwdcBc';
const currentId = 'SUdfDwAAQBAJ';

const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });
  for (let i = 0; i < apiIds.length; i++) {
    const id = apiIds[i];
    const book = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
      )
    ).data;
    await Book.create({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      year: book.volumeInfo.publishedDate.slice(0, 4),
      pages: book.volumeInfo.pageCount,
      genre: book.volumeInfo.categories[0],
      description: book.volumeInfo.description,
      smallImg: book.volumeInfo.imageLinks.smallThumbnail,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      apiId: book.id,
    });
  }
  await Book.update(
    { isCurrent: true },
    {
      where: {
        apiId: currentId,
      },
    }
  );
  // apiIds.forEach(async (id) => {
  //   const book = (
  //     await axios.get(
  //       `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  //     )
  //   ).data;
  //   console.log(book, 'book');
  //   await Book.create({
  //     title: book.volumeInfo.title,
  //     author: book.volumeInfo.authors[0],
  //     year: book.volumeInfo.publishedDate.slice(0, 4),
  //     pages: book.volumeInfo.pageCount,
  //     genre: book.volumeInfo.categories[0],
  //     description: book.volumeInfo.description,
  //     smallImg: book.volumeInfo.imageLinks.small,
  //     thumbnail: book.volumeInfo.imageLinks.thumbnail,
  //     apiId: book.id,
  //   });
  // });

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
