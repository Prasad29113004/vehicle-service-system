import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';

function EditVehicle() {
  const { vin } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ make: '', model: '', year: '', vin: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch vehicle data by VIN
    fetch(`http://localhost:3001/api/vehicles/${vin}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => setError('Failed to load vehicle data'));
  }, [vin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/vehicles/${vin}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) navigate('/vehicles');
    } catch (err) {
      setError('Failed to update vehicle');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h2>Edit Vehicle</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Form fields similar to AddVehicle.js */}
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditVehicle;