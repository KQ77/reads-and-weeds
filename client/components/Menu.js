import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../public/css/Burger.css';
import { logout } from '../redux/auth';
import { connect } from 'react-redux';

const _Burger = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Menu id="burger">
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>
      <Link id="profile" className="menu-item" to={`/members/${props.auth.id}`}>
        Profile
      </Link>
      <Link
        id=""
        className="menu-item"
        to={`/bookclubs/${props.bookclub.id}/photos`}
      >
        Photos
      </Link>
      <span
        style={{
          cursor: 'pointer',
          color: 'white',
        }}
        onClick={() => {
          props.logout();

          props.history.push('/');
        }}
      >
        Log Out
      </span>
    </Menu>
  );
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export const Burger = connect(null, mapDispatch)(_Burger);
