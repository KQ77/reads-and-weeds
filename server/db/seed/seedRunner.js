const { syncAndSeed } = require('./seed.js');

const seed = async () => {
  await syncAndSeed();
  console.log(`Seed File ran! DB seeded!`);
};

seed();
