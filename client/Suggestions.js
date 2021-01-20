import React from 'react';
import '../public/Suggestions.css';

const Suggestions = (props) => {
  return (
    <div id="suggestions">
      <label>
        <h3>Suggest A Book</h3>
      </label>
      <br></br>
      <input
        type="
  text"
        placeholder="search for a book"
      ></input>
      <button type="submit">Search</button>
    </div>
  );
};

export default Suggestions;
