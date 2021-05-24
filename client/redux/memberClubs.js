import axios from 'axios';

const SET_MEMBER_CLUBS = 'SET_MEMBER_CLUBS';

const setClubs = (clubs) => ({ type: SET_MEMBER_CLUBS, clubs });

//fetch all clubs associated with a memberId
export const fetchMemberClubs = (id) => {
  return async (dispatch) => {
    if (!id) {
      console.log('undefined auth.id');
      dispatch(setClubs([]));
    } else {
      const clubs = (await axios.get(`/api/members/${id}/clubs`)).data;
      dispatch(setClubs(clubs));
    }
  };
};

export const memberClubsReducer = (state = [], action) => {
  if (action.type === SET_MEMBER_CLUBS) {
    return action.clubs;
  }
  return state;
};
