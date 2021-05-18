import axios from 'axios';

const SET_BOOK_FEEDBACK = 'SET_BOOK_FEDBACK';

//feedback will be book with comments/ratings
const setFeedback = (feedback) => ({ type: SET_BOOK_FEEDBACK, feedback });

export const fetchFeedback = (bookId) => {
  //bookId here is book id from sequelize
  return async (dispatch) => {
    const feedback = (await axios.get(`/api/books/${bookId}/feedback`)).data;
    dispatch(setFeedback(feedback));
  };
};

export const feedbackReducer = (state = {}, action) => {
  if (action.type === SET_BOOK_FEEDBACK) {
    return action.feedback;
  }
  return state;
};
