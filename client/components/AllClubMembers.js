import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../public/css/AllClubMembers.css';
import { connect } from 'react-redux';
import { Burger, Footer } from './index';

const _AllClubMembers = (props) => {
  const [members, setMembers] = useState([]);
  const fetchMembers = async () => {
    const members = (
      await Axios.get(`/api/clubs/${props.match.params.id}/members`)
    ).data;
    setMembers(members);
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <Burger {...props} />
      {members.length ? (
        <div id="all-members-wrapper">
          <div>
            <h1> Club Members({members.length})</h1>
          </div>
          <div id="all-members">
            {members.map((member, idx) => (
              <Card key={idx}>
                <Card.Img src={member.imageUrl}></Card.Img>
                <Card.Title>
                  <Link to={`/members/${member.id}`}>{member.firstName}</Link>
                </Card.Title>
                <Card.Body>
                  <Card.Text>
                    Join Date: {member.clubmembers.joinDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Footer />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export const AllClubMembers = connect((state) => state)(_AllClubMembers);
