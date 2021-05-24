const members = [
  {
    firstName: 'Melissa V',
    email: 'melissaveloz4197@gmail.com',
    lastName: 'Veloz',
    password: 'weed',
    bio: `Just trying to get by...`,
    genre: `Historical Fiction, Mystery`,
    imageUrl: `/images/melv.jpeg`,
    faveBook: `The Awakening, She’s Come Undone`,
    favePick: ``,
  },
  {
    firstName: 'Melissa M',
    lastName: 'Mahon',
    password: 'weed',
    email: 'melissamahon33@gmail.com',
    bio: `Charismatic lover of life, extrovert that is married to an introvert with 2 highly adored spunky children,
      and a communication expert who couldn't survive this thing called life without the fabulous village around her.`,
    genre: `Psychological Thriller/ Mystery`,
    imageUrl: `/images/melm2.jpg`,
    faveBook: `The Interpreter of Maladies`,
    favePick: ``,
  },
  {
    firstName: 'Laura',
    email: 'lyarusavage@gmail.com',
    lastName: 'Yarusavage',
    password: 'weed',
    bio: `Age 42, enjoys long walks in the woods, is AN EDUCATOR IN THIS TOWN, has 3 douchey kids, and a husband 
      that talks a whole lot. `,
    genre: `Fiction/porn`,
    imageUrl: `/images/laura.jpeg`,
    faveBook: `She's Come Undone`,
    favePick: `American Dirt`,
  },

  {
    firstName: 'Courtney',
    lastName: 'Marsh',
    password: 'weed',
    email: 'courtney.j.marsh@gmail.com',
    bio: `30 something Long Islander turned Nutmeger. Seal selling, Exercise crazied, boy mom, 
      who volunteers too much, loves red wine, margaritas, and laughing her ass off. `,
    genre: `Historical Fiction`,
    imageUrl: `/images/courtney.jpeg`,
    faveBook: `American Dirt`,
    favePick: ``,
  },
  {
    firstName: 'Kate',
    lastName: 'Quinn',
    email: 'katequinn7@gmail.com',
    password: 'weed',
    bio: `Single Dad to two amazing kids, lover of life and all things Jo-Jo Siwa.  `,
    genre: `Twilight Fan Fiction`,
    faveBook: `Are You There, God? It's Me, Margaret.`,
    favePick: `Whichever one I picked`,
  },
  {
    firstName: 'Sarah',
    lastName: 'Voris',
    password: 'weed',
    email: 'spurcell922@yahoo.com',
    bio: `Mom to 2 boys who would rather be with their devices than their family.  Employee extraordinaire 
      who works relentlessly to make sure the job gets done.  Pinot Noir, massages and spa pedicures put me in my peaceful place 
      (seriously missing the massages and pedi's this week).  Beginning to appreciate the outdoors - biking, hiking, camping and all.  
      Reader of 1 author who joined book club to experience more and gain back some portion of my life with women who make me laugh! `,
    genre: `crime (fiction)`,
    imageUrl: `/images/sarah.jpg`,
    faveBook: `Anything James Patterson - Alex Cross or Michael Bennett`,
    favePick: ``,
  },
];

const rwBooks = [
  { gbId: `PmpfDwAAQBAJ`, number: 1, title: 'A Woman Is No Man' },
  { gbId: 'RidvDwAAQBAJ', number: 2, title: 'The Things We Cannot Say' },
  { gbId: '9-GCDwAAQBAJ', number: 3, title: 'The Immortalists' },
  { gbId: `wKFaDwAAQBAJ`, number: 4, title: 'The Mother-In-Law' },
  { gbId: `ey-BDwAAQBAJ`, number: 5, title: 'Ask Again, Yes' },
  { gbId: `FkiSDwAAQBAJ`, number: 6, title: 'American Dirt' },
  { gbId: `gt7EQgH8-b4C`, number: 7, title: 'Into Thin Air' },
  {
    gbId: `dAzJCwAAQBAJ`,
    number: 8,
    title: `
  Born A Crime: Stories from a South African Childhood`,
  },
  { gbId: `rQumDwAAQBAJ`, number: 9, title: 'Untamed' },
  { gbId: 'SUdfDwAAQBAJ', number: 10, title: 'The Hunting Party' },
  { gbId: 'nNjTDwAAQBAJ', number: 11, title: 'The Midnight Library' },
  { gbId: 'wq7eDwAAQBAJ', number: 12, title: 'This Tender Land' },
  { gbId: 'xmC9DwAAQBAJ', number: 13, isCurrent: true, title: 'Playing Nice' },
];

//seed some comments and ratings
const rwComments = [
  {
    text: 'This was an awesome book',
    memberId: 6,
    bookId: 6,
  },
  {
    text: 'This was okay',
    memberId: 6,
    bookId: 2,
  },
  {
    text: 'This was a horrible book',
    memberId: 6,
    bookId: 5,
  },
  {
    text: 'This was crap',
    memberId: 2,
    bookId: 13,
  },
  {
    text: `Best book I've ever read`,
    memberId: 1,
    bookId: 13,
  },
  {
    text: `Best book I've ever read`,
    memberId: 1,
    bookId: 12,
  },
];

const rwRatings = [
  {
    rating: 7.0,
    bookId: 3,
    memberId: 6,
  },
  {
    rating: 9.0,
    bookId: 13,
    memberId: 6,
  },
  {
    rating: 8.0,
    bookId: 3,
    memberId: 2,
  },
  {
    rating: 4.0,
    bookId: 3,
    memberId: 1,
  },
  {
    rating: 4.0,
    bookId: 12,
    memberId: 4,
  },
  {
    rating: 4.0,
    bookId: 12,
    memberId: 1,
  },
];

const rwImages = [{ src: '/images/hike.jpg' }, { src: '/images/library.jpg' }];

module.exports = { members, rwBooks, rwImages, rwComments, rwRatings };
