import React, { Component } from 'react';
import '../public/App.css';
import { Navbar } from './Navbar.js';
import { Banner } from './Banner.js';
import { MemberList } from './MemberList.js';
import { CurrentSelection } from './CurrentSelection';
import 'core-js/';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';

// class App extends Component {
//   constructor() {
//     super();
//   }
//   render() {
//     return (
//       <div>
//         <p>Testing -success!</p>
//         <Navbar />
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSelection: { title: 'Born A Crime' },
      pastSelections: [],
    };
    this.getMembers = this.getMembers.bind(this);
  }
  async getMembers() {
    let members = (await axios.get('/members')).data;
    console.log(members, 'members');
    this.setState({ members: members });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <Navbar></Navbar>
        </header>
        <div id="main">
          <Banner></Banner>
        </div>
        <CurrentSelection title={this.state.currentSelection.title} />
        <button onClick={this.getMembers}>Get Members</button>
        {this.state.members ? <MemberList members={this.state.members} /> : ''}
      </div>
    );
  }
}

export default App;
