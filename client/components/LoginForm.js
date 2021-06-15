import React, { useState, useEffect } from 'react';
import { Login, Register } from './index';
import '../../public/css/LoginForm.css';

export const LoginForm = (props) => {
  console.log(props, 'props');
  const [display, setDisplay] = useState('login');
  // useEffect(() => {

  // }, []);
  const toggleDisplay = () => {
    if (display === 'login') setDisplay('register');
    else setDisplay('login');
  };
  return (
    <div id="login-form">
      {display === 'login' ? <Login {...props} /> : <Register {...props} />}
      <span onClick={() => toggleDisplay()}>
        {display === 'login' ? 'not a member ? sign up here' : 'login'}
      </span>
    </div>
  );
};
