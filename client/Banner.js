import React from 'react';
import '../public/Banner.css';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

// const library = require('../public/library.jpg');
// const hike = require('../images/hike_e1f0015.jpg');
// import Hike from '../public/hike.jpg';
// import Library from '../public/library.jpg';

export const Banner = (props) => {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   imageSources: ['./hike.jpg'],
  //   // imageSources: ['./hike.jpg', './library.jpg'],
  // };
  // this.getClass = this.getClass.bind(this);
  //}
  const fadeImages = ['./hike.jpg', './library.jpg'];
  const fadeProperties = {
    autoplay: true,
    arrows: false,
    duration: 2000,
  };
  // componentDidMount() {
  //   setInterval(() => {
  //     let sources = this.state.imageSources;
  //     let first = sources.shift();
  //     sources.push(first);
  //     this.setState({ imageSources: sources });
  //   }, 3000);
  // }

  return (
    // <section id="banner">
    <div className="slide-container">
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div>
            <img className="banner-image" src={fadeImages[0]} />
          </div>
        </div>
        <div className="each-fade">
          <div>
            <img className="banner-image" src={fadeImages[1]} />
          </div>
        </div>
      </Fade>
      <div id="banner-text">
        <h1>Reads &amp; Weeds </h1> <h2>Read. Meet. Weed. Eat. Repeat. </h2>
      </div>
    </div>
    // </section>
  );

  // getClass(idx) {
  //   if (idx === 0) {
  //     return 'banner-image';
  //   } else {
  //     return 'banner-image hidden';
  //   }
  // }

  // render() {
  //   return (
  //     <section id="banner">
  //       {this.state.imageSources.map((imgSrc, index) => {
  //         return (
  //           <img
  //             key={index}
  //             className={this.getClass(index)}
  //             src={imgSrc}
  //             alt="background"
  //           ></img>
  //         );
  //       })}
  //       <div>
  //         <h1>Reads &amp; Weeds </h1> <h2>Read. Meet. Weed. Eat. Repeat. </h2>
  //       </div>
  //     </section>
  //   );
  // }
};
