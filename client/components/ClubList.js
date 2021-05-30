import React from 'react';
import '../../public/css/ClubList.css';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Popover } from 'react-bootstrap';

export const ClubList = (props) => {
  const { clubs } = props;
  const handleClick = () => {};
  return (
    <div id="clublist">
      {clubs.map((club, idx) => (
        <React.Fragment key={idx}>
          <Card style={{ width: '18rem' }} key={idx}>
            <Link to={`/bookclubs/${club.id}`}>
              <Card.Img variant="top" src={club.displayImage}></Card.Img>
            </Link>
            <Card.Body>
              <Card.Title>
                <strong>{club.name}</strong>
              </Card.Title>
              <Card.Text>{club.location}</Card.Text>
              <div id="card-text">
                <Card.Text>
                  {club.private ? 'private' : 'public'}
                  <span>|</span>
                  {club.members.length} members
                </Card.Text>
              </div>
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Title id="popover-title" as="h3">
                      Description
                    </Popover.Title>
                    <Popover.Content>{club.description}</Popover.Content>
                  </Popover>
                }
              >
                <span id="about">About</span>
              </OverlayTrigger>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => handleClick()} variant="info">
                {club.private ? 'Request to join' : 'Join'}
              </Button>
            </Card.Footer>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};
