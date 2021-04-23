import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const MemberLogin = (props) => {
  const [input, setInput] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === 'foobar') {
      setLoggedIn(true);
    }
    setErr('incorrect password');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Member Login</h1>
        <input
          onChange={handleChange}
          value={input}
          type="text"
          placeholder="enter password"
        />
        <p>{err}</p>
        <button type="submit">Login</button>
      </form>
      {loggedIn ? <Redirect to="/members-section" /> : ''}
    </div>
  );
};

export default MemberLogin;
