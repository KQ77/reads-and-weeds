import React, { useState } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../../public/css/Landing.css';
import { Modal, Button } from 'react-bootstrap';
import { Login } from './AuthForm';

const _Landing = (props) => {
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="landing">
      <Nav setAuthType={setAuthType} setShow={() => handleShow()} />
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>
            {authType === 'login' ? 'Log In' : 'Register'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <section id="hero">{/* <img src="/images/coffeebook.jpg" /> */}</section>
      <section id="your-clubs">{/* <ClubList clubs={clubs} /> */}</section>
    </div>
  );
};

//setAuth if someone signed in still
//once component mounts & auth is set - fetch user's bookclubs
const mapState = (state, routeProps) => {};
export const Landing = connect((state) => state)(_Landing);
