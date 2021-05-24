import axios from 'axios';

const SET_PAST_BOOKS = 'SET_BOOKS';

const setBooks = (books) => ({ type: SET_PAST_BOOKS, books });

export const fetchBookData = (clubId) => {
  return async (dispatch) => {
    const books = (
      await axios.post(`/api/clubs/${clubId}/books`, { past: true })
    ).data;
    dispatch(setBooks(books));
  };
};
export const pastBooksReducer = (state = [], action) => {
  if (action.type === SET_PAST_BOOKS) {
    return action.books;
  }
  return state;
};

// need to get all google book data for  a club - so fetch all books in the club and get gbook data for all books and send back with
//book Id attached ?

//or have a flag  for past = true if fetching books
//api/clubs/books {past: true}
