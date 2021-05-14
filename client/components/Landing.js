import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../../public/css/Landing.css';
import { Modal, Button } from 'react-bootstrap';
import { Login, Register } from './AuthForm';
import { ClubList } from './ClubList';
import { fetchMemberClubs } from '../redux/memberClubs';
import { CardGroup, Card } from 'react-bootstrap';

const _Landing = (props) => {
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // async function fetchMemberClubs() {
    //   const clubs = (await axios.get(`/api/members/${props.auth.id}/clubs`))
    //     .data;
    //   console.log(clubs, 'clubs');
    //   setClubs(clubs);
    // }
    // if (props.auth.id) {
    //   fetchMemberClubs();
    // }
    props.fetchClubs(props.auth.id);
  }, [props.auth.id]);
  const clubs = props.memberClubs;
  console.log(clubs, 'clubs');
  return (
    <div id="landing">
      <Nav setAuthType={setAuthType} setShow={() => handleShow()} />
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
      <section id="hero">{/* <img src="/images/coffeebook.jpg" /> */}</section>
      {props.auth.id ? (
        <section id="member-clubs">
          <h1>Your Clubs</h1>

          {clubs.map((club, idx) => (
            <React.Fragment key={idx}>
              <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={club.imgSrc}></Card.Img>
                <Card.Body>
                  <Card.Title>{club.name}</Card.Title>
                  <Card.Text>{club.location}</Card.Text>
                  <Card.Text>{club.tagline}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button>Visit</button>
                </Card.Footer>
              </Card>
            </React.Fragment>
          ))}
          {/* <ClubList clubs={clubs} /> */}
        </section>
      ) : (
        ''
      )}
    </div>
  );
};

//setAuth if someone signed in still
//once component mounts & auth is set - fetch user's bookclubs
const mapDispatch = (dispatch) => {
  return {
    fetchClubs: (id) => dispatch(fetchMemberClubs(id)),
  };
};
export const Landing = connect((state) => state, mapDispatch)(_Landing);
