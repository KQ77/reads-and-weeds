import React from 'react';
import '../../public/css/Banner.css';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { connect } from 'react-redux';

const _Banner = (props) => {
  const fadeImages = props.bookclub.images
    ? props.bookclub.images.map((img) => img.src)
    : null;
  const fadeProperties = {
    autoplay: true,
    arrows: false,
    duration: 3000,
    transitionDuration: 2000,
    infinite: true,
  };
  if (fadeImages) {
    if (fadeImages.length > 1) {
      return (
        <div className="slide-container">
          <div id="text-container">
            <div id="banner-text">
              <h1>{props.bookclub.name} </h1>{' '}
              {/* <h2>{props.bookclub.description} </h2> */}
            </div>
          </div>
          <Fade {...fadeProperties}>
            {fadeImages.map((image, idx) => (
              <div key={idx} className="each-fade">
                <div>
                  <img className="banner-image" src={image} />
                </div>
              </div>
            ))}
          </Fade>
          {/* <div id="banner-text">
          <h1>{props.bookclub.name} </h1> <h2>{props.bookclub.tagline} </h2>
        </div> */}
        </div>
      );
    } else
      return (
        <div className="slide-container">
          <div id="text-container">
            <div id="banner-text">
              <h1>{props.bookclub.name} </h1>{' '}
              {/* <h2>{props.bookclub.description} </h2> */}
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img className="banner-image" src={props.bookclub.displayImage} />
            </div>
          </div>
        </div>
      );
  } else {
    return null;
  }
};
{
  /* <div className="each-fade">
<div>
  <img className="banner-image" src={fadeImages[0]}></img>
</div>
</div> */
}

export const Banner = connect((state) => state)(_Banner);
