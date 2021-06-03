import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const AllClubMembers = (props) => {
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
  if (members.length) {
    return (
      <div id="all-members">
        {members.map((member, idx) => (
          <Card key={idx} style={{ width: '10rem', height: 'fit-content' }}>
            <Card.Img style={{ height: '8' }} src={member.imageUrl}></Card.Img>
            <Card.Title>{member.firstName}</Card.Title>
            <Card.Body>
              card body
              <Card.Text>Join Date: {member.clubmembers.joinDate}</Card.Text>
            </Card.Body>
            <Card.Footer>card footer</Card.Footer>
          </Card>
        ))}
      </div>
    );
  } else {
    return null;
  }
};
