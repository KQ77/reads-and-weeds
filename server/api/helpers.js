const axios = require('axios');

const fetchBook = async (gbId) => {
  const book = (
    await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${gbId}?key=${process.env.API_KEY}`
    )
  ).data;
  return book;
};

module.exports = { fetchBook };
