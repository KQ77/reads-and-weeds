import axios from 'axios';
import { async } from 'regenerator-runtime';

//action constants
const SET_AUTH = 'SET_AUTH';

//action creator
const _setAuth = (auth) => ({ type: SET_AUTH, auth });

export const setAuth = () => async (dispatch) => {
  try {
    //now a cookie will be sent with this request
    const member = (await axios.get('/api/auth/member')).data;
    //auth will either be the user or {} if no token - aka if user not yet logged in
    dispatch(_setAuth(member));
  } catch (err) {
    dispatch(_setAuth({ error: err }));
  }
};

export const authenticateUser =
  (formData, method, url, history) => async (dispatch) => {
    //this route creates a token for the user and stores it in a cookie
    try {
      await axios.post(`/api/auth/${method}`, formData);
      dispatch(setAuth());
      if (url) {
        console.log(url, 'url in redux store');
        history.push(`${url}`);
      }
    } catch (err) {
      dispatch(_setAuth({ error: err.response.data }));
    }
  };
export const logout = () => async (dispatch) => {
  await axios.post('/api/auth/logout');
  dispatch(_setAuth({}));
};

export const auth = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    return action.auth;
  }
  return state;
};

//person tries to visit a url like /invites/:id -- must be signed in -- how to check if signed in ? props.auth-- won't be there bc
// we lose state when we navigate away -- so somehow need to call api to check for a cookie and user  and set auth that way - setAuth()?
//setAuth queries api for user associated iwth cookie and sends back and sets the auth in state - if no cookie - should redirect to /login
// let's try
