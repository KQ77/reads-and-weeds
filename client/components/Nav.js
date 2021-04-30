import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import '../../public/Nav.css';
import { InputGroup, FormControl, Nav, Button, Form } from 'react-bootstrap';
import NavItem from 'react-bootstrap/NavItem';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const _Nav = (props) => {
  return (
    <Navbar id="navbar" className="color-nav" expand="lg">
      <Navbar.Brand href="/">Q-Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <InputGroup id="searchbar">
            {/* <InputGroup.Prepend>
          <InputGroup.Text>search</InputGroup.Text>
        </InputGroup.Prepend> */}
            <FormControl
              type="text"
              placeholder="find a group"
              aria-label="group"
              aria-describedby="basic-addon1"
            />
            <Button variant="info">Search</Button>
          </InputGroup>
        </Form>

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
