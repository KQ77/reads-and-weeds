const { conn } = require('../db.js');
const { BOOLEAN, STRING, TEXT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;
const Books = require('./Books.js');
const { Suggestion } = require('../Models/Suggestion.js');
const { Comment } = require('../Models/Comment.js');
const { Image } = require('../Models/Image');
const { Book } = require('../Models/Book');
const { Invite } = require('../Models/Invite');
const { Member } = require('../Models/Member');
const Rating = require('../Models/Rating');
const { Request } = require('../Models/Request');
const { Club } = require('../Models/Club');
const { ClubMembers } = require('../Models/ClubMembers');
const {
  members,
  rwBooks,
  rwImages,
  rwComments,
  rwRatings,
} = require('./readsweedseed');

//define associations
Comment.belongsTo(Book);
Book.hasMany(Comment);

Comment.belongsTo(Member);
Member.hasMany(Comment);

Suggestion.belongsTo(Member);
Member.hasMany(Suggestion);

Suggestion.belongsTo(Club);
Club.hasMany(Suggestion);

Member.belongsToMany(Club, { through: ClubMembers });
Club.belongsToMany(Member, { through: ClubMembers });

Book.belongsTo(Club);
Club.hasMany(Book);

Rating.belongsTo(Book);
Book.hasMany(Rating);

Rating.belongsTo(Member);
Member.hasMany(Rating);

Image.belongsTo(Club);
Club.hasMany(Image);

Image.belongsTo(Member);
Member.hasMany(Image);

Request.belongsTo(Member);
Member.hasMany(Request);

Request.belongsTo(Club);
Club.hasMany(Request);

Invite.belongsTo(Club);
Club.hasMany(Invite);

const syncAndSeed = async () => {
  await conn.authenticate();
  console.log('database authenticated');
  await conn.sync({ force: true });

  //**RW CLUB** //
  //seed club
  const RW = await Club.create({
    name: 'Reads and Weeds',
    location: 'Trumbull, CT',
    description: 'Read. Meet. Weed. Eat. Repeat.',
    private: true,
    displayImage: '/images/library.jpg',
  });
  //seed books
  const books = await Promise.all(rwBooks.map((book) => Book.create(book)));
  await RW.setBooks(books);
  //seed members
  const rwmembers = await Promise.all(
    members.map((member) => Member.create(member))
  );
  await RW.setMembers(rwmembers);
  //seed club images
  const images = await Promise.all(
    rwImages.map((image) => Image.create(image))
  );
  await RW.setImages(images);
  //add adminId
  const adminId = rwmembers.find((member) => member.firstName === 'Kate').id;
  await RW.update({ adminId });
  // seed comments and ratings
  await Promise.all(rwComments.map((comment) => Comment.create(comment)));
  await Promise.all(rwRatings.map((rating) => Rating.create(rating)));
};

module.exports = {
  Book,
  Rating,
  Comment,
  Member,
  Suggestion,
  Club,
  Image,
  Request,
  ClubMembers,
  Invite,
  syncAndSeed,
};
