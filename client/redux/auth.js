import axios from 'axios';
import { async } from 'regenerator-runtime';

//action constants
const SET_AUTH = 'SET_AUTH';

//action creator
const _setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticateUser = (formData, method) => async () => {
  //this route creates a token for the user and stores it in a cookie
  await axios.post(`/api/auth/${method}`, formData);
};
export const setAuth = () => {
  return async function (dispatch) {
    //now a cookie will be sent with this request
    try {
      const member = (await axios.get('/api/auth/member')).data;
      //auth will either be the user or {} if no token - aka if user not yet logged in
      dispatch(_setAuth(member));
    } catch (err) {
      dispatch(_setAuth({ error: err }));
    }
  };
};

export const auth = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    return action.auth;
  }
  return state;
};
