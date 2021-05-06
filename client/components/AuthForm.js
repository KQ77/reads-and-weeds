import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/auth';

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    //html5 method
    if (form.checkValidity() === false) {
      //   event.preventDefault();
      event.stopPropagation();
    }
    props.authenticate({ email, password }, props.formName);
  };
  return (
    <div id="authform">
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    formName: 'login',
  };
};
const mapRegister = (state) => {
  return {
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
