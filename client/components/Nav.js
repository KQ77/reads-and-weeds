import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/Nav.css';
import { Nav } from 'react-bootstrap';
import NavItem from 'react-bootstrap/NavItem';

const _Nav = (props) => {
  return (
    <Navbar style={{ padding: '0 auto' }} className="color-nav" expand="lg">
      <Navbar.Brand href="/">Q-Books</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link>+ Create club</Nav.Link>
          <Nav.Link>Log In</Nav.Link>
          <Nav.Link>Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect((state) => state)(_Nav);
