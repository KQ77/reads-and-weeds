import React, { useEffect, useState } from 'react';
import '../../public/css/LimitedView.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';

const _LimitedView = (props) => {
  const { club } = props;
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!props.auth) {
        props.setAuth();
      }
    }
    return () => (mounted = false);
  }, []);
  const sendRequest = async () => {
    await axios.post(`/api/clubs/${club.id}/requests`, {
      memberId: props.auth.id,
      clubId: club.id,
    });
    setRequested(true);
  };
  return (
    <div id="limited-club">
      <div>
        <h1>{club.name}</h1>
        <h2>{club.location}</h2>
        <h2>{club.private ? 'private' : 'public'}</h2>
      </div>
      <button disabled={requested} onClick={() => sendRequest()}>
        Request To Join
      </button>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const LimitedViewClub = connect(
  (state) => state,
  mapDispatch
)(_LimitedView);
