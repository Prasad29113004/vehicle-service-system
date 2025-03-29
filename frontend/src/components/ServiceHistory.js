import React, { useEffect, useState } from 'react';
import { Table, Alert, Container } from 'react-bootstrap';

function ServiceHistory() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setError('Failed to load service history'));
  }, []);

  return (
    <Container className="mt-5">
      <h2>Service History</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Service Type</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{new Date(service.date).toLocaleDateString()}</td>
              <td>{service.vehicle}</td>
              <td>{service.serviceType}</td>
              <td>{service.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ServiceHistory;