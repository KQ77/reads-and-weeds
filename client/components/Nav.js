import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/css/Nav.css';
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
  return (
    <Navbar id="navbar" expand="lg">
      <Navbar.Brand style={{ color: '#c1c2c9' }} href="/">
        Q-Books
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavDropdown
            id="nav-dropdown"
            title={
              <span>
                <img
                  style={{
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
                  href={`/members/${props.auth.id}/clubs}`}
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
                <NavDropdown.Item id="login-link" href={`/login`}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item id="signup-link">Register</NavDropdown.Item>
              </>
            ) : (
              ''
            )}
          </NavDropdown>
          {/* {!isLoggedIn ? (
            <>
              <Nav.Link
                onClick={() => {
                  props.setShow();
                  props.setAuthType('login');
                }}
              >
                Log In
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  props.setShow();
                  props.setAuthType('register');
                }}
              >
                Sign Up
              </Nav.Link>
            </>
          ) : (
            ''
          )} */}
          {/* {isLoggedIn ? (
            <Nav.Link
              onClick={() => {
                props.logout();
              }}
            >
              Log Out
            </Nav.Link>
          ) : (
            ''
          )} */}
          {/* <Nav.Link href="/create">Create</Nav.Link> */}
          {/* <Link to="/create">+Create club</Link> */}
        </Nav>
        <InputGroup className="justify-content-center" id="searchbar">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <img height="20px" src="/images/search_icon.png" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            id="searchform"
            placeholder="search for a club"
            aria-label="group"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={() => props.fetchResults(searchTerm)}
            variant="light"
          >
            Search
          </Button>
        </InputGroup>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
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
