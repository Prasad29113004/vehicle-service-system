import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

function BookService() {
  const [formData, setFormData] = useState({
    vehicle: '',
    serviceType: '',
    date: '',
    notes: ''
  });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call here
    setSuccess('Service booked successfully!');
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h2>Book a Service</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Vehicle</Form.Label>
              <Form.Select 
                name="vehicle" 
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                required
              >
                <option value="">Choose vehicle</option>
                <option value="car-1">Toyota Camry (ABC-123)</option>
                <option value="car-2">Honda Civic (XYZ-789)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Select 
                name="serviceType" 
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                required
              >
                <option value="">Select service</option>
                <option value="oil-change">Oil Change</option>
                <option value="tire-rotation">Tire Rotation</option>
                <option value="full-checkup">Full Checkup</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                placeholder="Describe the issue..."
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">Book Now</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookService;