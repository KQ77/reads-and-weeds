import {
  Form,
  Button,
  Container,
  Image,
  Popover,
  OverlayTrigger,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import '../../public/css/SuggestionSearch.css';
import { fetchClub } from '../redux/bookclub';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Burger, Footer } from './index';

const _SuggestionSearch = (props) => {
  useEffect(() => {
    props.fetchClub(props.match.params.id);
  }, []);

  const [results, setResults] = useState([]);
  const [suggestedIds, setSuggestedIds] = useState([]);

  const handleSearch = async (searchTerm) => {
    const results = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=30`
      )
    ).data;
    setResults(results.items);
  };

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
  const [error, setError] = useState('');

  const isCurrentBook = (id) => {
    const current = props.bookclub.books.find(
      (book) => book.isCurrent === true
    );
    if (current) return current.gbId === id;
    else return false;
  };
  const addBook = async (gbId, isCurrent, title) => {
    const clubId = props.match.params.id;
    if (props.bookclub.books.find((book) => book.gbId === gbId)) {
      setError('book is already in your collection');
    }
    await axios.post(`/api/books`, { clubId, gbId, isCurrent, title });
    props.fetchClub(props.match.params.id);
    // props.history.push(`/bookclubs/${props.match.params.id`)
  };
  console.log(props, 'props');
  return (
    <>
      <Burger {...props} />
      <Row style={{ margin: '4rem' }}>
        <Link to={`/bookclubs/${props.match.params.id}`}> back to club</Link>
      </Row>
      <div id="suggestion-search">
        <h2>Search For Your Next Selection</h2>
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
          <Button style={{ marginLeft: '1rem' }} type="submit">
            search
          </Button>
        </Form>

        <div id="search-results">
          {results.length
            ? results.map((result, idx) => (
                <Container key={idx} id="search-result-row">
                  <OverlayTrigger
                    trigger="hover, focus"
                    placement="right"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">Description</Popover.Title>
                        <Popover.Content style={{ width: 'fit-content' }}>
                          {result.volumeInfo.description}
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Image
                      className="book-cover"
                      src={
                        result.volumeInfo.imageLinks
                          ? result.volumeInfo.imageLinks.smallThumbnail
                          : '/images/noImage.jpeg'
                      }
                    />
                  </OverlayTrigger>

                  <Col style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>
                      <Link to={result.selfLink}>view on google books</Link>
                    </span>
                    <span style={{ fontSize: '1.5rem' }}>
                      {result.volumeInfo.title}
                    </span>
                    <span> by</span>
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
                        <img
                          height="30"
                          width="30"
                          src="/images/thumb.png"
                        ></img>

                        {suggestedIds.includes(result.id)
                          ? 'Suggested'
                          : 'Suggest'}
                      </span>
                    </Button>
                  </Col>
                  <Col>
                    <DropdownButton id="dropdown-item-button" title="Add Book">
                      <Dropdown.ItemText>Add as current book</Dropdown.ItemText>
                      <Dropdown.Item
                        onClick={() =>
                          addBook(result.id, true, result.volumeInfo.title)
                        }
                        as="button"
                      >
                        add as the book you are currently reading
                      </Dropdown.Item>
                      <Dropdown.ItemText>
                        Add to books you've read
                      </Dropdown.ItemText>
                      <Dropdown.Item
                        onClick={() =>
                          addBook(result.id, false, result.volumeInfo.title)
                        }
                        as="button"
                      >
                        these are books you've finished reading
                      </Dropdown.Item>
                    </DropdownButton>
                    <div style={{ color: 'green', fontSize: '1rem' }}>
                      {isCurrentBook(result.id)
                        ? `(this is your club's current selection)`
                        : ''}
                    </div>
                    <div className="error">{error}</div>
                  </Col>
                </Container>
              ))
            : ''}
        </div>
      </div>
      <Footer />
    </>
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
