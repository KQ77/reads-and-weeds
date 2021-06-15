import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../public/css/Burger.css';
import { logout, setAuth } from '../redux/auth';
import { connect } from 'react-redux';

const _Burger = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!props.auth) {
      props.setAuth();
    }
  }, []);
  console.log(props, 'props');
  return (
    <Menu id="burger">
      <span>Welcome {props.auth.firstName}</span>
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>

      {props.auth.id ? (
        <Link
          id="profile"
          className="menu-item"
          to={`/members/${props.auth.id}`}
        >
          Profile
        </Link>
      ) : (
        ''
      )}
      {props.auth.id ? (
        <Link to={`/members/${props.auth.id}/clubs`}>Your Clubs</Link>
      ) : (
        ''
      )}

      <Link className="menu-item" to="/explore">
        Explore
      </Link>
      {props.auth.id ? (
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
      ) : (
        ''
      )}
    </Menu>
  );
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setAuth: () => dispatch(setAuth()),
  };
};

export const Burger = connect(null, mapDispatch)(_Burger);
