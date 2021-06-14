import React, { useEffect, useState } from 'react';
import '../../public/css/LimitedView.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';
import { Link } from 'react-router-dom';
const _LimitedView = (props) => {
  const { club } = props;
  const isLoggedIn = () => !!props.auth.id;
  // const [requested, setRequested] = useState(
  //   props.bookclub.requests.some((req) => req.memberId === props.auth.id)
  // );
  const requested = props.bookclub.requests.some(
    (req) => req.memberId === props.auth.id
  );
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
    if (props.inviteView) {
      await axios.delete(`/api/invites/${props.match.params.id}`);
    }
    // setRequested(true);
  };
  console.log(props, 'props');
  return (
    <div>
      <div id="limited-club">
        <Link to="/explore">back to search</Link>
        <img src={club.displayImage} />
        <h1>{club.name}</h1>
        <h3>{club.location}</h3>
        <h3 style={{ fontStyle: 'italic' }}>
          {club.private === true ? 'private' : 'public'}
        </h3>
        <h3>
          Description: <span>{club.description}</span>
        </h3>
        <button disabled={requested} onClick={() => sendRequest()}>
          {requested ? 'Request sent' : 'Request To Join'}
        </button>
      </div>
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
