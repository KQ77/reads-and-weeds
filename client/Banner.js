import React from 'react';
import '../public/Banner.css';
// const library = require('../public/library.jpg');
// const hike = require('../images/hike_e1f0015.jpg');
// import Hike from '../public/hike.jpg';
// import Library from '../public/library.jpg';

export class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSources: ['./hike.jpg'],
      // imageSources: ['./hike.jpg', './library.jpg'],
    };
    this.getClass = this.getClass.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      let sources = this.state.imageSources;
      let first = sources.shift();
      sources.push(first);
      this.setState({ imageSources: sources });
    }, 3000);
  }

  getClass(idx) {
    if (idx === 0) {
      return 'banner-image';
    } else {
      return 'banner-image hidden';
    }
  }

  render() {
    return (
      <section id="banner">
        {this.state.imageSources.map((imgSrc, index) => {
          return (
            <img
              key={index}
              className={this.getClass(index)}
              src={imgSrc}
              alt="background"
            ></img>
          );
        })}
        <div>
          <h1>Reads &amp; Weeds </h1> <h2>Read. Meet. Weed. Eat. Repeat. </h2>
        </div>
      </section>
    );
  }
}
