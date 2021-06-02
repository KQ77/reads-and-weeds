import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LimitedViewClub } from './LimitedViewClub';

export const InviteView = (props) => {
  const [invite, setInvite] = useState({});

  const getInvite = async (id) => {
    const invite = (await axios.get(`/api/invites/${id}`)).data;
    setInvite(invite);
  };
  useEffect(() => {
    getInvite(props.match.params.id);
  }, []);

  if (invite.club) {
    return <LimitedViewClub inviteView={true} club={invite.club} />;
  } else {
    return null;
  }
};
