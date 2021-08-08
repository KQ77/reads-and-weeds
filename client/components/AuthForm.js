import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticateUser, setAuth } from '../redux/auth';

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validated, setValidated] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    props.setAuth();
  }, []);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    //html5 method
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      await props.authenticate(
        { email, password, firstName, lastName },
        props.formName
      );
      // if (props.handleClose) {
      //   props.handleClose();
      // } else {
      // if (!props.auth.error) {
      //   props.history.push(`/${props.location.search.split('=')[1]}`);
      // }
      // }
    } catch (err) {
      console.log(err, 'err');
      // setError(err);
    }
  };

  useEffect(() => {
    // if (props.auth.error) {
    //   setError(props.auth.error);
    //   // props.handleShow();
    // }
    if (props.auth.id && props.location.search.split('=').length) {
      props.history.push(`/${props.location.search.split('=')[1]}`);
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
        <Form.Text style={{ color: 'red', fontSize: '1rem' }}>
          {props.auth.error ? props.auth.error : ''}
        </Form.Text>
        {/* <Form.Text style={{ color: 'red' }}>{error}</Form.Text> */}
      </Form>
      {/* <div className="error">{props.auth.error ? props.auth.error : ''}</div> */}
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
    setAuth: () => dispatch(setAuth()),
    authenticate: (formData, method) =>
      dispatch(authenticateUser(formData, method)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Register = connect(mapRegister, mapDispatch)(AuthForm);
