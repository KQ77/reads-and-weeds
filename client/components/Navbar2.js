import '../../public/Navbar.css';
import React from 'react';

export class Navbar2 extends React.Component {
  render() {
    return (
      <header className="header">
        <nav>
          <div className="menu-logo">
            <p>
              Reads <br></br>&amp;<br></br>Weeds
            </p>
          </div>
          <div className="menu-link">
            <a href="#members">Members</a>
          </div>
          <div className="menu-link">
            <a href="#photos">Photos </a>
          </div>
          <div className="menu-link">
            <a href="#about">About </a>
          </div>
          <div className="menu-link">
            <a href="#contact">Contact</a>{' '}
          </div>
        </nav>
      </header>
    );
  }
}
