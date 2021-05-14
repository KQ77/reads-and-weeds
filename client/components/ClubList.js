import React from 'react';
import '../../public/css/ClubList.css';
import { CardGroup, Card } from 'react-bootstrap';

export const ClubList = (props) => {
  const { clubs } = props;
  console.log(props, 'props');

  return (
    <div id="clublist">
      {clubs.map((club, idx) => (
        <React.Fragment>
          <CardGroup>
            <Card key={idx}>
              <Card.Image variant="top" src={club.imgSrc}></Card.Image>
              <Card.Body>
                <Card.Title>hi</Card.Title>
                <Card.Text>text</Card.Text>
              </Card.Body>
              <Card.Footer>blah</Card.Footer>
            </Card>
          </CardGroup>
        </React.Fragment>
      ))}
      )
    </div>
  );
};
