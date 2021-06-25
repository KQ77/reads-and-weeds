import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import { connect } from 'react-redux';
import { Container, Button, Card } from 'react-bootstrap';
import { fetchSuggestions, removeSuggestion } from '../redux/suggestions';
import '../../public/css/Suggestions.css';
import { Link } from 'react-router-dom';

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
  if (suggestions.length) {
    return (
      <div>
        <h4>Added By This Club's Members</h4>
        <Container id="suggestion-row">
          {suggestions.map((suggestion, idx) => (
            <Card style={{ width: '12rem' }}>
              <a key={idx} href={suggestion.volumeInfo.previewLink}>
                <Card.Img
                  variant="top"
                  src={suggestion.volumeInfo.imageLinks.smallThumbnail}
                ></Card.Img>
                <Card.Text>{suggestion.volumeInfo.title}</Card.Text>
              </a>
              <Card.Footer>
                {suggestion.member.id === props.auth.id ? (
                  <Button
                    variant="light"
                    onClick={() => {
                      props.removeSuggestion(suggestion.suggestionId);
                      props.fetchClub(props.match.params.id);
                    }}
                  >
                    - remove suggestion
                  </Button>
                ) : (
                  <Card.Text>Added By {suggestion.member.firstName}</Card.Text>
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
