import axios from 'axios';

const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

const setSuggestions = (books) => ({
  type: SET_SUGGESTIONS,
  books,
});

export const fetchSuggestions = (bookIds) => {
  return async (dispatch) => {
    const books = (await axios.post(`/api/books/gbooks`, { bookIds })).data;
    dispatch(setSuggestions(books));
  };
};

export default (state = [], action) => {
  if (action.type === SET_SUGGESTIONS) {
    return action.books;
  }
  return state;
};
