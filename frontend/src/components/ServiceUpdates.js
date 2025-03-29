import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

function ServiceUpdates() {
  const { vehicleId } = useParams();
  const [updates, setUpdates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/service-updates/${vehicleId}`)
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch(() => setError('Failed to fetch updates'));
  }, [vehicleId]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Service Updates</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {updates.map((update, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                {update.type === 'image' ? (
                  <img 
                    src={update.mediaUrl} 
                    alt={update.title} 
                    className="img-fluid rounded"
                  />
                ) : (
                  <video controls className="w-100">
                    <source src={update.mediaUrl} type="video/mp4" />
                  </video>
                )}
                <Card.Title className="mt-3">{update.title}</Card.Title>
                <Card.Text>{update.description}</Card.Text>
                <small className="text-muted">
                  {new Date(update.timestamp).toLocaleString()}
                </small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceUpdates;