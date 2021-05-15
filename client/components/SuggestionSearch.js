import { Form, Book } from 'react-bootstrap';
import { connect } from 'react-redux';

const _SuggestionSearch = (props) => {
  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Control
          type="text"
          onChange={(e) => setBookToSearch(e.target.value)}
          required
          placeholder="search for a book"
        ></Form.Control>
        <Button type="submit">search</Button>
      </Form>
    </div>
  );
};

export const SuggestionSearch = connect((state) => state)(_SuggestionSearch);
