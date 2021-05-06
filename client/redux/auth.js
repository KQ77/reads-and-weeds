//constants

import { async } from 'regenerator-runtime';

const SET_AUTH = 'SET_AUTH';

//action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticateUser = (formData, method) => async (dispatch) => {
  console.log(formData, 'formData');
  console.log(method, 'method');
  dispatch(setAuth(formData));
};

export const auth = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    return action.auth;
  }
  return state;
};
