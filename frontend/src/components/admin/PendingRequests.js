import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/admin/requests')
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <div className="p-4">
      <h3>Pending Service Requests</h3>
      {requests.map((request) => (
        <Card key={request.id} className="mb-3 shadow">
          <Card.Body>
            <Card.Title>{request.vehicle}</Card.Title>
            <Card.Text>{request.description}</Card.Text>
            <Button variant="success">Confirm</Button>
            <Button variant="danger" className="ms-2">Reject</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default PendingRequests;