import React, { useState, useEffect } from 'react';
import { Login, Register, Burger, Footer } from './index';
import '../../public/css/LoginForm.css';
import { connect } from 'react-redux';

export const LoginForm = (props) => {
  console.log(props, 'props');
  const [display, setDisplay] = useState(props.login ? 'login' : 'register');
  // useEffect(() => {

  // }, []);
  console.log(display, 'display');
  const toggleDisplay = () => {
    if (display === 'login') setDisplay('register');
    else setDisplay('login');
  };
  return (
    <>
      <Burger {...props} />
      <div id="login-form">
        <h2>{display === 'login' ? 'Login' : 'Register'}</h2>
        <span onClick={() => toggleDisplay()}>
          {display === 'login'
            ? 'not a member ? sign up here'
            : 'already a member? login here'}
        </span>
        {display === 'login' ? <Login {...props} /> : <Register {...props} />}
      </div>
      <Footer />
    </>
  );
};

// export const LoginForm = connect((state) => state)(_LoginForm);
