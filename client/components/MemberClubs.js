import React, { useEffect } from 'react';
import { Burger, Footer } from './index';
import { connect } from 'react-redux';
import { fetchMemberClubs } from '../redux/memberClubs';
import { Card } from 'react-bootstrap';
import '../../public/css/MemberClubs.css';
import { Link } from 'react-router-dom';

const _MemberClubs = (props) => {
  useEffect(() => {
    props.fetchMemberClubs(props.match.params.id);
  }, []);
  const clubs = props.memberClubs;
  return (
    <div id="your-clubs-wrapper">
      <Burger {...props} />
      {clubs.length ? (
        <div id="your-clubs">
          <h1>Your Clubs</h1>
          <div>
            {clubs.map((club, idx) => (
              <Card
                key={idx}
                onClick={() => props.history.push(`/bookclubs/${club.id}`)}
                style={{ width: '15rem' }}
              >
                <Card.Img src={club.displayImage}></Card.Img>
                <Card.Body>
                  <Card.Text>{club.name}</Card.Text>
                  <Card.Text>
                    {club.private ? 'private' : 'public'}
                    <span> || </span>
                    {club.members.length} members
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div id="no-member-clubs">
          <div>
            <p>
              You are not yet a member of any club.{' '}
              <Link to="/explore">Explore</Link> all clubs to find a club to
              join or <Link to="/create">create</Link> a club of your own...
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchMemberClubs: (id) => dispatch(fetchMemberClubs(id)),
  };
};
export const MemberClubs = connect((state) => state, mapDispatch)(_MemberClubs);
