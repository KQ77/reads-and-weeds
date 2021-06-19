import axios from 'axios';

const SET_BOOKS = 'SET_BOOKS';

const setBooks = (books) => ({ type: SET_BOOKS, books });

export const fetchBookData = (clubId, past) => {
  return async (dispatch) => {
    console.log(past, 'past');
    const books = (await axios.get(`/api/clubs/${clubId}/books?past=${past}`))
      .data;
    dispatch(setBooks(books));
  };
};
export const booksReducer = (state = [], action) => {
  if (action.type === SET_BOOKS) {
    return action.books;
  }
  return state;
};

// need to get all google book data for  a club - so fetch all books in the club and get gbook data for all books and send back with
//book Id attached ?

//or have a flag  for past = true if fetching books
//api/clubs/books {past: true}
