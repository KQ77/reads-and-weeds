import React from 'react';
import '../public/Banner.css';
const library = require('../public/library.jpg');
const hike = require('../public/hike.jpg');
// import hike from '../public/hike.jpg';
// import library from '../public/library.jpg';

export class Banner extends React.Component {
  constructor(props) {
    super(props);
    console.log(hike, 'hike');
    this.state = {
      imageSources: [{ hike }, { library }],
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
          <h1>Reads &amp; Weeds</h1>
          <h2>Read... meet... weed...eat... repeat...</h2>
        </div>
      </section>
    );
  }
}
