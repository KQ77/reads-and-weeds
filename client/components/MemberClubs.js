import React, { useEffect } from 'react';
import { Burger } from './index';
import { connect } from 'react-redux';
import { fetchMemberClubs } from '../redux/memberClubs';
import { Card } from 'react-bootstrap';
import '../../public/css/MemberClubs.css';

const _MemberClubs = (props) => {
  useEffect(() => {
    props.fetchMemberClubs(props.match.params.id);
  }, []);
  const clubs = props.memberClubs;
  return (
    <div>
      <Burger {...props} />
      <div id="your-clubs">
        <h1>Your Clubs</h1>
        <div>
          {clubs.length ? (
            <div>
              {clubs.map((club) => (
                <Card style={{ width: '15rem' }}>
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
          ) : (
            'no clubs'
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchMemberClubs: (id) => dispatch(fetchMemberClubs(id)),
  };
};
export const MemberClubs = connect((state) => state, mapDispatch)(_MemberClubs);
