import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import { connect } from 'react-redux';
import { Container, Button, Card } from 'react-bootstrap';
import { fetchSuggestions, removeSuggestion } from '../redux/suggestions';
import '../../public/css/Suggestions.css';

const _Suggestions = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchSuggestions(props.match.params.id);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const { suggestions } = props;
  console.log(suggestions, 'suggestions');
  console.log(props, 'props');
  if (suggestions.length) {
    return (
      <div>
        <h4>Added By This Club's Members</h4>
        <Container id="suggestion-row">
          {suggestions.map((suggestion, idx) => (
            <Card key={idx} style={{ width: '12rem' }}>
              <Card.Img
                variant="top"
                src={suggestion.volumeInfo.imageLinks.smallThumbnail}
              ></Card.Img>
              <Card.Text>{suggestion.volumeInfo.title}</Card.Text>
              <Card.Text>Added By {suggestion.member.firstName}</Card.Text>
              <Card.Footer>
                {suggestion.member.id === props.auth.id ? (
                  <Button
                    variant="light"
                    onClick={() =>
                      props.removeSuggestion(suggestion.suggestionId)
                    }
                  >
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
    fetchSuggestions: (clubId) => dispatch(fetchSuggestions(clubId)),
    removeSuggestion: (id) => dispatch(removeSuggestion(id)),
  };
};
export const Suggestions = connect((state) => state, mapDispatch)(_Suggestions);
