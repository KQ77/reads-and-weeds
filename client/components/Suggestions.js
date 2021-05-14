import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../public/css/Suggestions.css';
import axios from 'axios';

const Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(async () => {
    const suggestions = (await axios.get('/api/suggestions')).data;
    setSuggestions(suggestions);
    return () => '';
  }, [suggestions]);
  return (
    <div id="suggestions">
      <h1>Current Suggested Books</h1>
      <p>{suggestions.length}</p>
    </div>
  );
};

export default Suggestions;
