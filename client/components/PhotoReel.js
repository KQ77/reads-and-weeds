import React from 'react';
import { Carousel, Figure } from 'react-bootstrap';
import '../../public/css/PhotoReel.css';

export const PhotoReel = (props) => {
  console.log(props, 'props');
  const { photos } = props;
  return (
    <div id="photo-reel">
      {photos.map((photo) => (
        <Figure>
          <Figure.Image src={photo.src}></Figure.Image>
          <Figure.Caption>{photo.caption || ''}</Figure.Caption>
        </Figure>
      ))}

      {/* <Carousel>
        {photos.map((photo) => (
          <Carousel.Item>
            <img src={photo.src} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel> */}
    </div>
  );
};
