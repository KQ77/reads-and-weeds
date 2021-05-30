import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../public/css/ClubRequests.css';
import { Card, Button } from 'react-bootstrap';

const _Requests = (props) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      const requests = (
        await axios.get(`/api/admin/requests/${props.match.params.id}`)
      ).data;
      setRequests(requests);
    };
    let mounted = true;
    if (mounted) {
      fetchRequests();
    }
  }, []);
  return (
    <div id="club-requests">
      {requests.map((req, idx) => (
        <div key={idx}>
          <Card style={{ width: '8rem' }}>
            <Card.Img src={req.member.imageUrl}></Card.Img>
            <Card.Title>
              {req.member.firstName} {req.member.lastName}
            </Card.Title>

            <Button>Approve</Button>
            <Button>Delete</Button>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const ClubRequests = connect((state) => state)(_Requests);
