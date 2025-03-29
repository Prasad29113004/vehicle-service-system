import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddVehicle() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/vehicles/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess('Vehicle added successfully!');
        setTimeout(() => navigate('/vehicles'), 2000); // Redirect after success
      } else {
        setError('Failed to add vehicle');
      }
    } catch (err) {
      setError('Failed to add vehicle');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h2>Add Vehicle</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Toyota"
                name="make"
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Camry"
                name="model"
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 2020"
                name="year"
                min="1900"
                max="2024"
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vehicle Identification Number"
                name="vin"
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Add Vehicle</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddVehicle;