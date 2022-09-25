import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Container, Modal } from 'react-bootstrap';
import '../../public/css/Nav.css';
import { Burger } from './Menu';
import { fetchResults } from '../redux/searchResults';
const { icon } = require('../../public/images/search_icon.png');

import {
  InputGroup,
  FormControl,
  Nav,
  Image,
  Button,
  NavDropdown,
  Form,
} from 'react-bootstrap';
import { logout } from '../redux/auth';

const _Nav = (props) => {
  const { isLoggedIn } = props;
  const [searchTerm, setSearchTerm] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(props, 'props');
  const { memberClubs } = props;

  return (
    <div id="navbar-container">
      {/* <Burger {...props} /> */}
      <Navbar id="navbar" expand="lg">
        <Container>
          {/* <Nav> */}
          {/* <Burger {...props} /> */}
          {/* </Nav> */}
          {/* <Navbar.Brand style={{ color: '#c1c2c9' }} href="/"> */}
          <Navbar.Brand style={{ color: 'white' }} href="/">
            Q-Books
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav>
            <NavDropdown
              id="nav-dropdown"
              title={
                <span style={{ color: 'white' }}>
                  <img
                    style={{
                      marginRight: '.3rem',
                      borderRadius: '100%',
                      border: '1px solid white',
                    }}
                    height="35"
                    width="35"
                    src={props.auth.imageUrl || '/images/defaultProfile.png'}
                  />
                  {props.auth.firstName || ''}
                </span>
              }
            >
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item
                    style={{ color: 'black' }}
                    href={`/members/${props.auth.id}`}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    style={{ color: 'black' }}
                    href={`/members/${props.auth.id}/clubs`}
                  >
                    Your Clubs
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      props.logout();
                    }}
                  >
                    Log Out
                  </NavDropdown.Item>
                </>
              ) : (
                ''
              )}
              {!isLoggedIn ? (
                <>
                  <NavDropdown.Item id="login-link" href={`/login?redirect=`}>
                    Login
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item id="signup-link" href={`/login?redirect=`}>
                  Register
                </NavDropdown.Item> */}
                  <NavDropdown.Item
                    id="signup-link"
                    href={`/register?redirect=`}
                  >
                    Register
                  </NavDropdown.Item>
                </>
              ) : (
                ''
              )}
            </NavDropdown>
          </Nav>
          <Navbar.Text onClick={() => setOpen(true)} id="navbar-clubs">
            Your Clubs
          </Navbar.Text>
        </Container>
        {/* </Navbar.Collapse> */}
      </Navbar>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Clubs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {memberClubs.length ? (
            memberClubs.map((club) => (
              <div>
                <Link
                  onClick={() => setOpen(false)}
                  to={`/bookclubs/${club.id}`}
                >
                  <img
                    style={{
                      marginRight: '2rem',
                      borderRadius: '100%',
                      height: '3rem',
                      width: '3rem',
                    }}
                    src={club.displayImage}
                  />
                  {club.name}
                </Link>
                <hr />
              </div>
            ))
          ) : (
            <div>
              You are not a member of any club at this time
              <button>Create Club</button>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* <InputGroup className="justify-content-center" id="searchbar">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <img height="20px" src="/images/search_icon.png" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          id="searchform"
          placeholder="search clubs by name or location"
          aria-label="group"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => props.fetchResults(searchTerm)} variant="light">
          Search
        </Button>
      </InputGroup> */}
    </div>
  );
};

const mapState = (state) => {
  console.log(state, 'state');
  return {
    auth: state.auth,
    memberClubs: state.memberClubs,
    isLoggedIn: state.auth.id ? true : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchResults: (term) => dispatch(fetchResults(term)),
    logout: () => dispatch(logout()),
  };
};
export default connect(mapState, mapDispatch)(_Nav);
