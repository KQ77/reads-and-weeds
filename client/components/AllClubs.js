import React, { useEffect, useState } from 'react';
import { fetchClubs } from '../redux/clubs';
import { ClubList } from './ClubList';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import '../../public/css/AllClubs.css';

const _AllClubs = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchClubs();
    }
    return () => (mounted = false);
  }, []);
  const clubs = props.allClubs;
  const [searchTerm, setSearchTerm] = useState('');
  if (clubs) {
    return (
      <div id="all-clubs">
        <h1>Explore All Clubs</h1>
        <Form.Control
          style={{ width: '50rem', margin: '1rem .5rem' }}
          placeholder="search for a club"
          type="text"
        ></Form.Control>
        <ClubList clubs={clubs} />
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchClubs: () => dispatch(fetchClubs()),
  };
};
export const AllClubs = connect((state) => state, mapDispatch)(_AllClubs);
