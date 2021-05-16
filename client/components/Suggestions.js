import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import { connect } from 'react-redux';
import { Container, Button, Card, Image } from 'react-bootstrap';
import { fetchSuggestions } from '../redux/suggestions';

const _Suggestions = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchSuggestions(
        props.bookclub.suggestions.map((suggestion) => suggestion.bookId)
      );
    }
    return () => {
      mounted = false;
    };
  }, []);
  const { suggestions } = props;
  if (suggestions.length) {
    return (
      <div id="suggestions">
        <h4>
          Suggested By This Club's Members <span>{suggestions.length}</span>
          {suggestions.map((suggestion, idx) => (
            <Container key={idx}>{suggestion.volumeInfo.title}</Container>
          ))}
        </h4>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchSuggestions: (bookIdArray) => dispatch(fetchSuggestions(bookIdArray)),
  };
};
export const Suggestions = connect((state) => state, mapDispatch)(_Suggestions);
