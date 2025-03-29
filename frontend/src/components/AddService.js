import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [formData, setFormData] = useState({
    serviceType: '',
    serviceDate: '',
    cost: '',
    description: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/services/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess('Service added successfully!');
        setTimeout(() => navigate('/services'), 2000);
      } else {
        setError('Failed to add service');
      }
    } catch (err) {
      setError('Failed to add service');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h2>Add New Service</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as="select"
                name="serviceType"
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                required
              >
                <option value="">Select Service</option>
                <option value="oil_change">Oil Change</option>
                <option value="brake_service">Brake Service</option>
                <option value="tire_rotation">Tire Rotation</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Date</Form.Label>
              <Form.Control
                type="date"
                name="serviceDate"
                onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cost in USD"
                name="cost"
                step="0.01"
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Service details..."
                name="description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">Add Service</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddService;