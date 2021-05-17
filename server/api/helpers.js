const axios = require('axios');

const fetchBook = async (bookId) => {
  return (
    await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.API_KEY}`
    )
  ).data;
};

module.exports = { fetchBook };
