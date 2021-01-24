import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../public/Suggestions.css';

const Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(async () => {
    const suggestions = (await axios.get('/api/suggestions')).data;
    setSuggestions(suggestions);
  }, [suggestions]);
  return <div id="suggestions"></div>;
};

export default Suggestions;
