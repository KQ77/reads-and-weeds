const { conn } = require('../db.js');
const { BOOLEAN, STRING, TEXT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;
const Books = require('./Books.js');
const { Suggestion } = require('../Models/Suggestion.js');
const { Comment } = require('../Models/Comment.js');
// const Members = require('./Members.js');
const { Book } = require('../Models/Book');
const { Member } = require('../Models/Member');
const { Rating } = require('../Models/Rating');
const { Club } = require('../Models/Club');
const { ClubMembers } = require('../Models/ClubMembers');
const { members, rwBooks } = require('./readsweedseed');
const axios = require('axios');

//define associations
Comment.belongsTo(Book);
Book.hasMany(Comment);

Comment.belongsTo(Member);
Member.hasMany(Comment);

Suggestion.belongsTo(Member);
Member.hasMany(Suggestion);

Member.belongsToMany(Club, { through: ClubMembers, foreignKey: 'memberId' });
Club.belongsToMany(Member, { through: ClubMembers, foreignKey: 'clubId' });

Book.belongsTo(Club);
Club.hasMany(Book);
//Book has many rating?
//member has many rating
//rating belongs to member

// const apiKey = 'AIzaSyCkkHyRp__65PWLfn50WMtKrIncdJwdcBc';
const currentId = 'SUdfDwAAQBAJ';

const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });

  //seed R&W club
  const RW = await Club.create({
    name: 'Reads and Weeds',
    location: 'Trumbull, CT',
    tagline: 'Read. Meet. Weed. Eat. Repeat.',
  });
  const books = await Promise.all(rwBooks.map((book) => Book.create(book)));
  await RW.setBooks(books);
  // await Promise.all(books.map((book) => book.update({ clubId: RW.id })));

  const rwmembers = await Promise.all(
    members.map((member) => Member.create(member))
  );
  await RW.setMembers(rwmembers);
  console.log(await RW.getMembers());
  //for (let i = 0; i < apiIds.length; i++) {
  //   const id = apiIds[i];
  //   const book = (
  //     await axios.get(
  //       `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  //     )
  //   ).data;
  //   await Book.create({
  //     title: book.volumeInfo.title,
  //     author: book.volumeInfo.authors[0],
  //     year: book.volumeInfo.publishedDate.slice(0, 4),
  //     pages: book.volumeInfo.pageCount,
  //     genre: book.volumeInfo.categories[0],
  //     description: book.volumeInfo.description,
  //     smallImg: book.volumeInfo.imageLinks.smallThumbnail,
  //     thumbnail: book.volumeInfo.imageLinks.thumbnail,
  //     apiId: book.id,
  //   });
  // }
  // await Book.update(
  //   { isCurrent: true },
  //   {
  //     where: {
  //       apiId: currentId,
  //     },
  //   }
  // );
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

  // await Promise.all(
  //   Members.map((member) =>
  //     Member.create({
  //       firstName: member.firstName,
  //       lastName: member.lastName,
  //       genre: member.genre,
  //       faveBook: member.faveBook,
  //       favePick: member.favePick,
  //       imageUrl: member.imageUrl,
  //       bio: member.bio,
  //     })
  //   )
  // );
};
module.exports = {
  Book,
  Rating,
  Comment,
  Member,
  Suggestion,
  Club,
  syncAndSeed,
};
