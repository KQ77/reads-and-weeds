import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/Nav.css';
import { Nav } from 'react-bootstrap';

const _Nav = (props) => {
  return (
    <div id="nav">
      <Navbar style={{ padding: '2rem' }} className="color-nav" expand="lg">
        <Navbar.Brand href="/">Q-Books</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>+ Create club</Nav.Link>
            <Nav.Link>Log In</Nav.Link>
            <Nav.Link>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export const Nav = connect((state) => state)(_Nav);
