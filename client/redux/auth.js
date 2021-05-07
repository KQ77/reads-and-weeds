import axios from 'axios';

//action constants
const SET_AUTH = 'SET_AUTH';

//action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticateUser = (formData, method) => async (dispatch) => {
  await axios.post(`/api/auth/${method}`, formData);
  //   dispatch(setAuth(formData));
};

export const auth = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    return action.auth;
  }
  return state;
};
