import React, { Component } from 'react';
import '../public/App.css';
import { Navbar } from './Navbar.js';
import { Banner } from './Banner.js';
import MemberList from './MemberList.js';
import SingleBook from './SingeBook';
import Comments from './Comments';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';

const currentId = `rQumDwAAQBAJ`;
const bookIds = [
  'PmpfDwAAQBAJ',
  'RidvDwAAQBAJ',
  `9-GCDwAAQBAJ`,
  `wKFaDwAAQBAJ`,
  `ey-BDwAAQBAJ`,
  `FkiSDwAAQBAJ`,
  `gt7EQgH8-b4C`,
  `dAzJCwAAQBAJ`,
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: '',
      currentBookID: `rQumDwAAQBAJ`,
      books: [],
    };
    this.getMembers = this.getMembers.bind(this);
  }
  async getMembers() {
    let members = (await axios.get('/members')).data;
    this.setState({ members: members });
  }
  async getBook(id) {}
  async componentDidMount() {
    const books = [];
    await bookIds.forEach(async (bookId) => {
      const book = await axios.get(`/api/volume/${bookId}`).data;
      books.push(book);
    });
    this.setState({ books: books });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <Navbar></Navbar>
        </header>
        <Banner></Banner>
        {this.state.currentBook.id ? (
          <section id="current-selection">
            <h1>Current Selection</h1>
            <SingleBook book={this.state.currentBook} />
            <Comments book={this.state.currentBook} />
          </section>
        ) : (
          ''
        )}
        <button onClick={this.getMembers}>Get Members</button>
        {this.state.members ? <MemberList members={this.state.members} /> : ''}
      </div>
    );
  }
}

export default App;
