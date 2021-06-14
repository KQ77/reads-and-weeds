import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export const CreateInvite = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const sendInvite = async (e) => {
    e.preventDefault();
    if (
      props.bookclub.members.find(
        (member) => member.email.toLowerCase() === email.toLowerCase()
      )
    ) {
      setError('a member with this email is already a member of this club');
    } else {
      await axios.post(`/api/clubs/${props.clubId}/invites`, {
        clubId: props.clubId,
        senderId: props.auth.id,
        email,
      });
      //send toast popup that invite was successfully sent and close the modal
      props.handleClose();
    }
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
      <div style={{ color: 'red', margin: '.5rem' }}>{error}</div>
      <Button onClick={(e) => sendInvite(e)}>Send Invite</Button>
    </Form>
  );
};
