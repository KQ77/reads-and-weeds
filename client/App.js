import React, { Component } from 'react';
import '../public/App.css';
import { Navbar } from './Navbar.js';
import { Banner } from './Banner.js';
import MemberList from './MemberList.js';
import SingleBook from './SingeBook';
import Comments from './Comments';
import BookList from './BookList';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: '',
      prevBooks: [],
      members: [],
    };
  }

  async componentDidMount() {
    const books = (await axios.get('/api/books')).data;
    const members = (await axios.get('api/members')).data;
    console.log(members);
    this.setState({ members: members });
    const prevBooks = books.filter((book) => book.isCurrent === false);
    const currentBook = books.filter((book) => book.isCurrent === true)[0];
    this.setState({ prevBooks, currentBook });
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <Navbar></Navbar>
        </header>
        <Banner></Banner>
        <section id="current-selection">
          <h1>Current Selection</h1>
          {this.state.currentBook.id ? (
            <>
              <SingleBook book={this.state.currentBook} />
              <Comments book={this.state.currentBook} />
            </>
          ) : (
            ''
          )}
        </section>
        <section id="past-selections">
          <h1>Past Selections</h1>
          <BookList books={this.state.prevBooks} />
        </section>
        <section id="members">
          <h1>Meet Our Members</h1>
          {this.state.members.length ? (
            <MemberList members={this.state.members} />
          ) : (
            ''
          )}
        </section>
      </div>
    );
  }
}

export default App;
