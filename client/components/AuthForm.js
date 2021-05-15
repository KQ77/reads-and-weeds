import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/auth';

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validated, setValidated] = useState(true);
  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    //html5 method
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    props.authenticate(
      { email, password, firstName, lastName },
      props.formName
    );
    props.handleClose();
  };

  useEffect(() => {
    if (props.auth.error) {
      setError(props.auth.error);
      props.handleShow();
    }
  }, [props.auth]);
  return (
    <div id="authform">
      <Form xs="auto" noValidate validated={validated} onSubmit={handleSubmit}>
        {props.formName === 'register' ? (
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter first name"
            ></Form.Control>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Enter last name"
            ></Form.Control>
          </Form.Group>
        ) : (
          ''
        )}
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Form.Text style={{ color: 'red' }}>{error}</Form.Text>
      </Form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    auth: state.auth,
    formName: 'login',
  };
};
const mapRegister = (state) => {
  return {
    auth: state.auth,
    formName: 'register',
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticate: (formData, method) =>
      dispatch(authenticateUser(formData, method)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Register = connect(mapRegister, mapDispatch)(AuthForm);
