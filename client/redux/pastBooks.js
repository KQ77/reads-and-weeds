import axios from 'axios';

const SET_BOOKS = 'SET_BOOKS';

const setBooks = (books) => ({ type: SET_BOOKS, books });

export const fetchPastBooks = (bookIds) => {
  return async (dispatch) => {
    const books = (await axios.post(`/api/books/gbooks`, { bookIds })).data;
    dispatch(setBooks(books));
  };
};

export const pastBooksReducer = (state = [], action) => {
  if (action.type === SET_BOOKS) {
    return action.books;
  }
  return state;
};
