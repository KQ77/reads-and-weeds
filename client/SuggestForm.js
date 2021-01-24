import React from 'react';
import '../public/SuggestForm.css';

const SuggestForm = (props) => {
  return (
    <div id="suggest-form">
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

export default SuggestForm;
