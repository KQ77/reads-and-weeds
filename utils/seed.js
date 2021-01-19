const { conn } = require('../server/db.js');
const { BOOLEAN, STRING, TEXT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;
const Books = require('../server/Books.js');
const Members = require('../server/Members.js');
const { Book } = require('../server/Book');
const axios = require('axios');
//define Models

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

//define associations
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

const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });
  // const bookInfo = await Promise.all(
  //   apiIds.map((id) =>
  //     axios.get(
  //       `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  //     )
  //   )
  // ).data;
  apiIds.forEach(async (id) => {
    const book = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
      )
    ).data;
    console.log(book.volumeInfo.authors[0], 'book.author');
    await Book.create({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      year: book.volumeInfo.publishedDate.slice(0, 4),
      pages: book.volumeInfo.pageCount,
      genre: book.volumeInfo.categories[0],
      description: book.volumeInfo.description,
      smallImg: book.volumeInfo.imageLinks.small,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      apiId: book.id,
    });
  });
  // const id = apiIds[0];
  // const bookInfo = (
  //   await axios.get(
  //     `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  //   )
  // ).data;
  // console.log(bookInfo, '*******bookInfo***********');

  // await Promise.all(
  //   bookInfo.map((book) =>
  //     Book.create({
  //       title: book.volumeInfo.title,
  //       author: book.volumeInfo.authors[0],
  //       year: book.volumeInfo.publishedDate.slice(0, 4),
  //       pages: book.volumeInfo.pageCount,
  //       genre: book.volumeInfo.categories[0],
  //       description: book.volumeInfo.description,
  //       imgSrc: book.volumeInfo.imageLinks.small,
  //       apiId: book.id,
  //     })
  //   )
  // );
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
