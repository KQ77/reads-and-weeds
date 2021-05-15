import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const _Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  // useEffect(async () => {
  //   const suggestions = (await axios.get('/api/suggestions')).data;
  //   setSuggestions(suggestions);
  //   return () => '';
  // }, [suggestions]);
  const handleSearch = async (text) => {
    const results = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${text}`
    ).data;
  };

  //have a button for "add suggestion" which takes you to new page where you can search..then results pop up under the
  //search area.you can select a book to suggest, then it will direct you back to bookclub page
  //see how amazon bookclubs handles this
  const [bookToSearch, setBookToSearch] = useState('');
  return (
    <div id="suggestions">
      <h4>
        Suggested By This Club's Members <span>{suggestions.length}</span>
      </h4>
    </div>
  );
};

export const Suggestions = connect((state) => state)(_Suggestions);
