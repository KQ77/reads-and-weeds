import axios from 'axios';

//action constants
const SET_AUTH = 'SET_AUTH';

//action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticateUser = (formData, method) => async (dispatch) => {
  console.log('in authenticate user function');
  //this route creates a token for the user and stores it in a cookie
  await axios.post(`/api/auth/${method}`, formData);
  const member = (await axios.get('/api/auth/member')).data;
  console.log(member, 'member');
  dispatch(setAuth(member));
};

export const auth = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    return action.auth;
  }
  return state;
};
