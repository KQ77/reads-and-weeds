import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LimitedViewClub } from './LimitedViewClub';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuth } from '../redux/auth';
import { Login, Burger, BookClub } from './index';
import '../../public/css/InviteView.css';

const _InviteView = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [invite, setInvite] = useState({});
  const [redirect, setRedirect] = useState(false);

  const getInvite = async () => {
    const id = props.match.params.id;
    const _invite = (await axios.get(`/api/invites/${props.match.params.id}`))
      .data;
    setInvite(_invite);
  };
  useEffect(() => {
    if (!props.auth) {
      props.setAuth();
    }
  }, []);

  useEffect(() => {
    getInvite();
  }, []);

  if (invite.id) {
    return (
      <>
        <Burger {...props} />
        <div id="invite">
          {!props.auth.id &&
            props.history.push(
              `/login/redirect?url=${props.location.pathname.slice(1)}`
            )}
          {props.auth.id && props.history.push(`/bookclubs/${invite.clubId}`)}
          {/* {invite.club && (
            <LimitedViewClub {...props} inviteView={true} club={invite.club} />
          )} */}
          {/* {invite.club && (
            <BookClub {...props} inviteView={true} club={invite.club} />
          )} */}
        </div>
      </>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const InviteView = connect((state) => state, mapDispatch)(_InviteView);
