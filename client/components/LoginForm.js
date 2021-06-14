import React, { useState } from 'react';
import { Login, Register } from './index';

export const LoginForm = (props) => {
  const [display, setDisplay] = useState('login');
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
