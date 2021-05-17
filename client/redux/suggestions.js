import axios from 'axios';

const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
const setSuggestions = (books) => ({
  type: SET_SUGGESTIONS,
  books,
});
const _removeSuggestion = (id) => ({ type: REMOVE_SUGGESTION, id });

export const fetchSuggestions = (bookIds) => {
  return async (dispatch) => {
    const books = (await axios.post(`/api/books/gbooks`, { bookIds })).data;
    dispatch(setSuggestions(books));
  };
};

export const removeSuggestion = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/suggestions/${id}`);
    dispatch(_removeSuggestion(id));
  };
};
export default (state = [], action) => {
  if (action.type === SET_SUGGESTIONS) {
    return action.books;
  }
  if (action.type === REMOVE_SUGGESTION) {
    return state.suggestions.filter((s) => s.id !== action.id);
  }
  return state;
};
