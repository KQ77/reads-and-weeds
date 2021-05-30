import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-router-dom';
import '../../public/css/ClubRequests.css';

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
      {requests.map((req) => (
        <div>{req.id}</div>
      ))}
    </div>
  );
};

export const Requests = connect((state) => state)(_Requests);
