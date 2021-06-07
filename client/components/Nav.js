import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/css/Nav.css';
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
  return (
    <Navbar id="navbar" className="color-nav" expand="lg">
      <Navbar.Brand href="/">Q-Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {props.auth.id ? (
            <NavDropdown
              id="nav-dropdown"
              title={
                <span>
                  <img
                    style={{ borderRadius: '100%', border: '1px solid white' }}
                    height="35"
                    width="35"
                    src={props.auth.imageUrl}
                  />
                  {props.auth.firstName}
                </span>
              }
            >
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
              {/* <NavDropdown.Item
                style={{ color: 'black' }}
                onClick={() => console.log('logging out')}
                href="#"
              >
                Log Out
              </NavDropdown.Item> */}
            </NavDropdown>
          ) : (
            ''
          )}
          {/* <Navbar.Text id="navbar-text">
            {props.auth.firstName || ''}
          </Navbar.Text> */}
          {!isLoggedIn ? (
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
          )}
          {isLoggedIn ? (
            <Nav.Link
              onClick={() => {
                props.logout();
              }}
            >
              Log Out
            </Nav.Link>
          ) : (
            ''
          )}
          <Nav.Link href="/create">Create</Nav.Link>
          {/* <Link to="/create">+Create club</Link> */}
        </Nav>
        <InputGroup className="justify-content-center" id="searchbar">
          <FormControl
            type="text"
            id="searchform"
            placeholder="search for a club"
            aria-label="group"
            aria-describedby="basic-addon1"
          />
          <Button variant="light">Search</Button>
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
    logout: () => dispatch(logout()),
  };
};
export default connect(mapState, mapDispatch)(_Nav);
