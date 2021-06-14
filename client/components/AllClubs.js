import React, { useEffect, useState } from 'react';
import { fetchClubs } from '../redux/clubs';
import { Burger, ClubList } from './index';
import { connect } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import '../../public/css/AllClubs.css';
import { fetchResults } from '../redux/searchResults';
import axios from 'axios';

const _AllClubs = (props) => {
  // const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [termSearched, setTermSearched] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchClubs = async () => {
    const clubs = (await axios.get('/api/clubs')).data;
    setClubs(clubs);
  };
  //upon component mounting -set search results as all clubs in redux state
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchResults(' ');
    }
    return () => (mounted = false);
  }, []);
  const handleSubmit = async (term) => {
    console.log(props.allClubs, 'props.allclubs');
    // const results = props.searchResults.filter(
    //   (club) => club.name.includes(term) || club.location.includes(term)
    // );
    props.fetchResults(term);
    setTermSearched(term);
    // setClubs(results);
    setSearched(true);
  };
  // const clubs = props.allClubs;

  const results = props.searchResults;
  if (results) {
    return (
      <>
        <Burger {...props} />
        <div id="all-clubs">
          <h1>Search All Clubs</h1>
          <div className="search-form">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <img height="20px" src="/images/search_icon.png" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                aria-label="searchbar"
                aria-describedby="basic-addon1"
                placeholder="search clubs by name or location"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search clubs by name or location"
              />
              <Button onClick={() => handleSubmit(searchTerm)} variant="light">
                Search
              </Button>
            </InputGroup>
          </div>
          <div className="search-results">
            <h4 style={{ fontFamily: 'auto' }}>
              {searched
                ? results.length === 0
                  ? `0 results for '${termSearched}'`
                  : `showing 1-${results.length} results for '${termSearched}'`
                : ''}
            </h4>
            <ClubList clubs={results} {...props} />
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchClubs: () => dispatch(fetchClubs()),
    fetchResults: (searchTerm) => dispatch(fetchResults(searchTerm)),
  };
};
export const AllClubs = connect((state) => state, mapDispatch)(_AllClubs);
