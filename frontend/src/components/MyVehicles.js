import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      setError('Failed to load vehicles');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []); // Fetch on component mount

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/vehicles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <Container className="mt-5">
      <h2>My Vehicles</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>VIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vin}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.vin}</td>
              <td>
                <Button variant="info" size="sm" as={Link} to={`/edit-vehicle/${vehicle.vin}`}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button as={Link} to="/add-vehicle" variant="primary">
        Add New Vehicle
      </Button>
    </Container>
  );
}

export default MyVehicles;
