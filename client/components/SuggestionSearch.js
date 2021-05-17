import { Form, Button, Container, Image, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import '../../public/css/SuggestionSearch.css';
import { fetchClub } from '../redux/bookclub';
import axios from 'axios';

const _SuggestionSearch = (props) => {
  useEffect(() => {
    props.fetchClub(props.match.params.id);
  }, []);
  const [results, setResults] = useState([]);
  const handleSearch = async (searchTerm) => {
    const results = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      )
    ).data;
    console.log(results.items, 'results');
    setResults(results.items);
  };
  const [suggestedIds, setSuggestedIds] = useState([]);
  const toggleSuggestion = async (bookId) => {
    await axios.put(`/api/suggestions/`, { clubId: props.bookclub.id, bookId });
    if (suggestedIds.includes(bookId)) {
      setSuggestedIds(suggestedIds.filter((id) => id !== bookId));
    } else {
      const idArray = [...suggestedIds];
      idArray.push(bookId);
      setSuggestedIds(idArray);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');

  console.log(suggestedIds, 'suggested Ids');
  return (
    <div id="suggestion-search">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
      >
        <Form.Control
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          placeholder="search for a book"
        ></Form.Control>
        <Button type="submit">search</Button>
      </Form>
      <div id="search-results">
        {results.length
          ? results.map((result, idx) => (
              <Container key={idx} id="search-result-row">
                <Image
                  src={
                    result.volumeInfo.imageLinks
                      ? result.volumeInfo.imageLinks.smallThumbnail
                      : '/images/noImage.jpeg'
                  }
                />

                <Col>
                  <span style={{ fontSize: '1.5rem' }}>
                    {result.volumeInfo.title}
                  </span>
                  <br></br>
                  <span> by</span>{' '}
                  <span style={{ fontSize: '1.3rem' }}>
                    {result.volumeInfo.authors
                      ? result.volumeInfo.authors[0]
                      : ''}
                  </span>
                  <br></br>
                  <Button
                    className={
                      suggestedIds.includes(result.id) ? 'suggested' : ''
                    }
                    onClick={(e) => {
                      toggleSuggestion(result.id);
                    }}
                    variant="light"
                  >
                    <span>
                      <img height="30" width="30" src="/images/thumb.png"></img>

                      {suggestedIds.includes(result.id)
                        ? 'Suggested'
                        : 'Suggest'}
                    </span>
                  </Button>
                </Col>
              </Container>
            ))
          : ''}
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
  };
};
export const SuggestionSearch = connect(
  (state) => state,
  mapDispatch
)(_SuggestionSearch);
