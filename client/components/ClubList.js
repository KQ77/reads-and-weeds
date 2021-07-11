import React, { useEffect } from 'react';
import '../../public/css/ClubList.css';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';

const _ClubList = (props) => {
  useEffect(() => {
    if (!props.auth) {
      props.setAuth();
    }
  }, []);
  const { clubs } = props;
  const requested = (props, club) => {
    const { requests } = club;
    if (requests.find((req) => req.memberId === props.auth.id)) return true;
    else return false;
  };
  const isMember = (memberId, club) => {
    return club.members.some((member) => member.id === memberId);
  };

  const handleClick = async (club) => {
    if (!props.auth.id) {
      props.history.push(`/login?redirect=explore`);
    }
    if (club.private === true) {
      //send request to /api/clubs/:clubId/requests
      await axios.post(`/api/clubs/${club.id}/requests`, {
        memberId: props.auth.id,
        clubId: club.id,
      });
    } else {
      await axios.post(`/api/clubs/${club.id}/members`, {
        memberId: props.auth.id,
        clubId: club.id,
      });
      // await axios.post(`/api/members/${props.auth.id}/clubs`);
    }
    props.fetchClubs();
    window.location.reload();
  };
  return (
    <div id="clublist">
      {clubs.map((club, idx) => (
        <React.Fragment key={idx}>
          <Card style={{ width: '25rem' }}>
            <Link
              to={
                props.auth.id
                  ? `/bookclubs/${club.id}`
                  : `/login/redirect?url=bookclubs/${club.id}`
              }
            >
              <Card.Img
                variant="top"
                style={{ height: '12rem' }}
                src={club.displayImage}
              ></Card.Img>
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
                  {club.members.length} member
                  {club.members.length === 1 ? '' : 's'}
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
              {isMember(props.auth.id, club) ? (
                <div>
                  <p
                    style={{
                      color: 'green',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      height="15px"
                      style={{ marginRight: '.5rem' }}
                      src="/images/check.png"
                    ></img>
                    member
                  </p>
                </div>
              ) : requested(props, club) ? (
                <p style={{ fontStyle: 'italic', color: 'lightgray' }}>
                  Join Request Sent
                </p>
              ) : (
                <Button onClick={() => handleClick(club)} variant="info">
                  {club.private === true ? 'Request to join' : 'Join'}
                </Button>
              )}
            </Card.Footer>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const ClubList = connect((state) => state, mapDispatch)(_ClubList);
