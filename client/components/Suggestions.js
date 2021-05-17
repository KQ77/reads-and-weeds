import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import { connect } from 'react-redux';
import { Container, Button, Card, Image } from 'react-bootstrap';
import { fetchSuggestions, removeSuggestion } from '../redux/suggestions';
import '../../public/css/Suggestions.css';

const _Suggestions = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchSuggestions(
        props.bookclub.suggestions.map((suggestion) => suggestion.bookId)
      );
      // props.fetchSuggestions(props.bookclub.suggestions);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const getMemberName = (bookId, props) => {
    //suggestions from DB
    const suggestions = props.bookclub.suggestions;
    //find the suggestion where the bookId === the one from the gbooks info
    const suggestion = suggestions.find(
      (_suggestion) => _suggestion.bookId === bookId
    );
    //if member who suggested it is the one logged in, return "you" : return member's first name
    return suggestion.member.id === props.auth.id
      ? 'You'
      : suggestion.member.firstName;
  };
  // suggestions here will refer to once suggestions are set in redux state
  //these will be a list of books with all info from google books api
  const { suggestions } = props;
  if (suggestions.length) {
    return (
      <div>
        <h4>
          Suggested By This Club's Members <span>({suggestions.length})</span>
        </h4>
        <Container id="suggestion-row">
          {suggestions.map((suggestion, idx) => (
            <Card key={idx} style={{ width: '15rem' }}>
              <Card.Img
                variant="top"
                src={suggestion.volumeInfo.imageLinks.smallThumbnail}
              ></Card.Img>
              <Card.Text>{suggestion.volumeInfo.title}</Card.Text>
              <Card.Text>
                Suggested By {getMemberName(suggestion.id, props)}
              </Card.Text>
              <Card.Footer>
                {getMemberName(suggestion.id, props).toLowerCase() === 'you' ? (
                  <Button onClick={() => props.removeSuggestion(suggestion.id)}>
                    - remove suggestion
                  </Button>
                ) : (
                  ''
                )}
              </Card.Footer>
            </Card>
          ))}
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchSuggestions: (bookIdArray) => dispatch(fetchSuggestions(bookIdArray)),
    removeSuggestion: (bookId) => dispatch(removeSuggestion(bookId)),
  };
};
export const Suggestions = connect((state) => state, mapDispatch)(_Suggestions);
