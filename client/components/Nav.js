import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/css/Nav.css';
import { InputGroup, FormControl, Nav, Button, Form } from 'react-bootstrap';

const _Nav = (props) => {
  const { isLoggedIn } = props;
  return (
    <Navbar id="navbar" className="color-nav" expand="lg">
      <Navbar.Brand href="/">Q-Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Navbar.Text>Welcome {props.auth.firstName || ''}!</Navbar.Text>

          <Nav.Link>+ Create club</Nav.Link>
          {!isLoggedIn ? (
            <Nav.Link
              onClick={() => {
                props.setShow();
                props.setAuthType('login');
              }}
            >
              Log In
            </Nav.Link>
          ) : (
            ''
          )}
          <Nav.Link
            onClick={() => {
              props.setShow();
              props.setAuthType('register');
            }}
          >
            Sign Up
          </Nav.Link>
        </Nav>
        <InputGroup className="justify-content-center" id="searchbar">
          <FormControl
            type="text"
            placeholder="find a group"
            aria-label="group"
            aria-describedby="basic-addon1"
          />
          <Button variant="info">Search</Button>
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
  return {};
};
export default connect(mapState)(_Nav);
