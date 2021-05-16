import axios from 'axios';

const SET_PAST_BOOKS = 'SET_BOOKS';

const setBooks = (books) => ({ type: SET_PAST_BOOKS, books });

export const fetchPastBooks = (bookIds) => {
  return async (dispatch) => {
    const books = (await axios.post(`/api/books/gbooks`, { bookIds })).data;
    dispatch(setBooks(books));
  };
};

export const pastBooksReducer = (state = [], action) => {
  if (action.type === SET_PAST_BOOKS) {
    return action.books;
  }
  return state;
};
