import React, { useEffect } from 'react';
import '../../public/css/ClubList.css';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

const _ClubList = (props) => {
  const { clubs } = props;
  const requested = (props, club) => {
    const { requests } = club;
    if (requests.find((req) => req.memberId === props.auth.id)) return true;
    else return false;
  };
  const handleClick = async (clubId) => {
    //send request to /api/clubs/:clubId/requests
    await axios.post(`/api/clubs/${clubId}/requests`, {
      memberId: props.auth.id,
      clubId,
    });
    props.fetchClubs();
  };
  return (
    <div id="clublist">
      {clubs.map((club, idx) => (
        <React.Fragment key={idx}>
          <Card style={{ width: '18rem' }} key={idx}>
            <Link
              to={
                props.auth.id
                  ? `/bookclubs/${club.id}`
                  : `/login/redirect?url=bookclubs/${club.id}`
              }
            >
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
              {/* //if not requested, display button, else display " request sent" */}
              {requested(props, club) ? (
                <p style={{ fontStyle: 'italic', color: 'lightgray' }}>
                  Join Request Sent
                </p>
              ) : (
                <Button onClick={() => handleClick(club.id)} variant="info">
                  {club.private ? 'Request to join' : 'Join'}
                </Button>
              )}
            </Card.Footer>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};

export const ClubList = connect((state) => state)(_ClubList);
