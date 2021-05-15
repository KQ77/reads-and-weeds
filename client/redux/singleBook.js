import axios from 'axios';

const SET_BOOK = 'SET_BOOK';

const setBook = (book) => ({ type: SET_BOOK, book });

export const fetchGoogleBook = (bookId) => {
  return async (dispatch) => {
    const book = (await axios.get(`/api/books/gbooks/${bookId}`)).data;
    dispatch(setBook(book));
  };
};

export const singleBookReducer = (state = {}, action) => {
  if (action.type === SET_BOOK) {
    return action.book;
  }
  return state;
};
