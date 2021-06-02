import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export const CreateInvite = (props) => {
  //need clubID -- should have it bc you can only get here by clicking button on bookclub page which
  // will have props.bookclub.id
  //maybe check for if !props.bookclub.id ?? -- can take it from props.match.params.id.. hmmmmm
  const [email, setEmail] = useState('');
  const sendInvite = async (e) => {
    //send request to /api/clubs/id/invites
    e.preventDefault();
    console.log(props, 'props');

    await axios.post(`/api/clubs/${props.clubId}/invites`, {
      clubId: props.clubId,
      senderId: props.auth.id,
      email,
    });

    //do something else?
    //send toast popup that invite was successfully sent and close the modal
    props.handleClose();
  };
  return (
    <Form>
      <Form.Group>
        Enter email of the member you wish to invite
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter valid email, i.e john.doe@example.com"
        ></Form.Control>
      </Form.Group>
      <Button onClick={(e) => sendInvite(e)}>Send Invite</Button>
    </Form>
  );
};

//invite -- should it have a member Id? or just an email
//maybe just an email.. then the person gets the email..goes to the url -- /bookclubs/id/invites/UUID ...and when they are logged in
// the backend will take care of the memberId... and create the clubmembers entry which needs a memberId and and clubId only..
//
