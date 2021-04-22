import React, { Component } from 'react';
import '../public/App.css';
import { Navbar } from './Navbar.js';
import { Banner } from './Banner.js';
import MemberList from './MemberList.js';
import SingleBook from './SingleBook';
import Comments from './Comments';
import BookList from './BookList';
import PastSelections from './PastSelections';
import Suggestions from './Suggestions';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import Sidebar from './Sidebar';
import SuggestForm from './SuggestForm';
import SingleMember from './SingleMember';
import Footer from './Footer.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MemberLogin from './MemberLogin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentBook: '',
      prevBooks: [],
      members: [],
    };
  }

  async componentDidMount() {
    const allBooks = (await axios.get('/api/books')).data;
    const members = (await axios.get('api/members')).data;
    members.sort((a, b) => a.firstName.localeCompare(b.firstName));
    const prevBooks = allBooks.filter((book) => book.isCurrent === false);
    const currentBook = allBooks.filter((book) => book.isCurrent === true)[0];
    this.setState({ allBooks, members, prevBooks, currentBook });
  }
  render() {
    const { members } = this.state;
    const current = this.state.currentBook;
    const books = this.state.allBooks;
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Navbar} />
          <Route exact path="/" component={Banner} />
          <section id="main-app">
            <Route
              exact
              path="/"
              render={() => <Sidebar members={members} />}
            />
            <div id="right">
              {this.state.currentBook.id ? (
                <>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <SingleBook
                        id={this.state.currentBook.id}
                        isCurrent={current.isCurrent}
                        books={books}
                      />
                    )}
                  />
                </>
              ) : (
                ''
              )}

              <Route
                exact
                path="/"
                render={(props) => (
                  <PastSelections books={this.state.prevBooks} />
                )}
              />
              <Route exact path="/" component={SuggestForm} />
              <Route exact path="/" component={Suggestions} />
              <Route exact path="/" component={MemberLogin} />
            </div>
          </section>
          <Route
            exact
            path="/members/:memberId"
            render={(props) => (
              <SingleMember
                id={props.match.params.memberId}
                members={members}
              />
            )}
          />
          <Route
            exact
            path="/books/:bookId"
            render={(props) => (
              <SingleBook books={books} id={props.match.params.bookId * 1} />
            )}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
