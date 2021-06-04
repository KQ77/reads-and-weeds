import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LimitedViewClub } from './LimitedViewClub';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuth } from '../redux/auth';
import { Login } from './index';

const _InviteView = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [invite, setInvite] = useState({});
  const [redirect, setRedirect] = useState(false);

  const getInvite = async (id) => {
    const invite = (await axios.get(`/api/invites/${id}`)).data;
    setInvite(invite);
  };
  useEffect(() => {
    if (!props.auth) {
      props.setAuth();
    }
  }, []);

  useEffect(() => {
    if (props.auth) {
      if (props.auth.id) {
        console.log('there is someone logged in');
        getInvite(props.match.params.id);
        //   } else {
        //     console.log('must redirect to login now');
        //     setRedirect(true);
        //   }
        // }
      }
    }
  }, [props.auth]);
  console.log(props, 'props');
  console.log(invite, 'invite');
  return (
    <div id="invite">
      {!props.auth.id && <Login {...props} redirectUrl={props.match.url} />}
      {invite.club && (
        <LimitedViewClub {...props} inviteView={true} club={invite.club} />
      )}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const InviteView = connect((state) => state, mapDispatch)(_InviteView);
