import React, { useEffect, useState } from 'react';
import '../../public/css/LimitedView.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';
import { Link } from 'react-router-dom';
import { fetchClub } from '../redux/bookclub';
const _LimitedView = (props) => {
  const { club } = props;
  const isLoggedIn = () => !!props.auth.id;
  const [error, setError] = useState('');
  // const [requested, setRequested] = useState(
  //   props.bookclub.requests.some((req) => req.memberId === props.auth.id)
  // );
  // useEffect(() => {
  //   props.fetchClub(props.match.params.id);
  // }, []);
  const requested = club.requests.some((req) => req.memberId === props.auth.id);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!props.auth) {
        props.setAuth();
      }
    }
    return () => (mounted = false);
  }, []);
  const isMember = club.members
    ? club.members.find((member) => member.id === props.auth.id)
    : '';
  const sendRequest = async () => {
    try {
      await axios.post(`/api/clubs/${club.id}/requests`, {
        memberId: props.auth.id,
        clubId: club.id,
      });
      if (props.inviteView) {
        await axios.delete(`/api/invites/${props.match.params.id}`);
      }
    } catch (err) {
      console.log(err, 'err');
      setError(err.response.data);
    }
  };
  console.log(props, 'props');
  return (
    <div>
      <div id="limited-club">
        {/* <Link to="/explore">back to search</Link> */}
        <img src={club.displayImage} />
        <h1>{club.name}</h1>
        <h3>{club.location}</h3>
        <h3 style={{ fontStyle: 'italic' }}>
          {club.private === true ? 'private' : 'public'}
        </h3>
        <h3>
          Description: <span>{club.description}</span>
        </h3>
        <button disabled={requested || isMember} onClick={() => sendRequest()}>
          {isMember ? 'member' : requested ? 'Request sent' : 'Request To Join'}
        </button>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
    fetchClub: (id) => dispatch(fetchClub(id)),
  };
};
export const LimitedViewClub = connect(
  (state) => state,
  mapDispatch
)(_LimitedView);
