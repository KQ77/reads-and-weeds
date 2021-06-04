import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../public/css/AllClubMembers.css';

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
        <h1>All Members({members.length})</h1>
        {members.map((member, idx) => (
          <Card key={idx}>
            <Card.Img src={member.imageUrl}></Card.Img>
            <Card.Title>
              <Link to={`/members/${member.id}`}>{member.firstName}</Link>
            </Card.Title>
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
