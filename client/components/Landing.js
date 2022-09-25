import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import '../../public/css/Landing.css';
import {
  Modal,
  Button,
  Card,
  CardGroup,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { Login, Register } from './AuthForm';
import { ClubList } from './ClubList';
import { fetchMemberClubs } from '../redux/memberClubs';
import { Footer } from './Footer';
import { setAuth } from '../redux/auth';

const _Landing = (props) => {
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!props.auth) {
      props.setAuth();
    }
  }, []);

  useEffect(() => {
    props.fetchClubs(props.auth.id);
  }, [props.auth.id]);

  const clubs = props.memberClubs;
  // const { searchResults } = props;
  return (
    <>
      <Nav setAuthType={setAuthType} setShow={() => handleShow()} />
      <div id="landing">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {authType === 'login' ? 'Log In' : 'Register'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {authType === 'login' ? (
              <Login handleShow={handleShow} handleClose={handleClose} />
            ) : (
              <Register handleShow={handleShow} handleClose={handleClose} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <section id="hero">
          <div>
            <div>
              <h1>Q Book Clubs</h1>
              <p>Explore. Create. Read. Meet. Discuss.</p>
            </div>

            <div>
              <Link to="/explore">
                <Button>explore</Button>
              </Link>
              <Link
                to={props.auth.id ? '/create' : '/login/redirect?url=create'}
              >
                <Button>create</Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

//setAuth if someone signed in still
//once component mounts & auth is set - fetch user's bookclubs
const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
    fetchClubs: (id) => dispatch(fetchMemberClubs(id)),
  };
};
export const Landing = connect((state) => state, mapDispatch)(_Landing);
