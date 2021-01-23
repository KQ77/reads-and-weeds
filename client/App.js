import React, { Component } from 'react';
import '../public/App.css';
import { Navbar } from './Navbar.js';
import { Banner } from './Banner.js';
import MemberList from './MemberList.js';
import SingleBook from './SingleBook';
import Comments from './Comments';
import BookList from './BookList';
import PastSelections from './PastSelections';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import Sidebar from './Sidebar';
import Suggestions from './Suggestions';
import SingleMember from './SingleMember';
import Footer from './Footer.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
    members.sort((a, b) => a.firstName.localeCompare(b.firstName));
    const prevBooks = books.filter((book) => book.isCurrent === false);
    const currentBook = books.filter((book) => book.isCurrent === true)[0];
    this.setState({ members, prevBooks, currentBook });
  }
  render() {
    const { members } = this.state;
    const current = this.state.currentBook;
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
                        isCurrent={current.isCurrent}
                        book={this.state.currentBook}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Comments book={this.state.currentBook} />
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
              <Route exact path="/" component={Suggestions} />
              {/* <section id="members">
                <h1>Meet Our Members</h1>
                {this.state.members.length ? (
                  <MemberList members={this.state.members} />
                ) : (
                  ''
                )}
              </section> */}
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
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
