import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServiceTimeline from './ServiceTimeline/ServiceTimeline';
import './Dashboard.css'; // Ensure this file exists for styling

function Dashboard() {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch services and vehicles on component mount
    fetch('http://localhost:3001/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch('http://localhost:3001/api/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  // Check for upcoming services
  const hasPendingServices = services.some(
    (service) => new Date(service.date) < new Date()
  );

  return (
    <Container fluid className="dashboard-container">
      {/* Sidebar */}
      <Row>
        <Col md={3} className="sidebar bg-dark text-light vh-100 p-4">
          <img 
            src="/images/vehicle-care-icon.png" 
            alt="Vehicle Care Logo" 
            style={{ width: '80px', marginBottom: '10px' }} 
          />
          <h3 className="mb-4">VehicleCare</h3>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" className="text-light">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="text-light">
              Service Alerts
            </Nav.Link>
            <Nav.Link as={Link} to="/vehicles" className="text-light">
              My Vehicles
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-light">
              Profile
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2>Vehicle Service Dashboard</h2>
          {/* Hero Section */}
          <div className="dashboard-hero text-center mb-4">
            <h1>Welcome Back to VehicleCare 🚗</h1>
            <p>Manage your vehicles and services seamlessly</p>
          </div>

          {/* Dashboard Overview */}
          <div className="text-center mb-4">
            <h2>Dashboard Overview 🚗</h2>
            <p>Your vehicles are ready! ✅</p>
          </div>

          {/* Stats Cards */}
          <Row className="dashboard-stats text-center mb-4">
            <Col md={6}>
              <Card className="stat-card shadow">
                <Card.Body>
                  <h3>{vehicles.length}</h3>
                  <p>Registered Vehicles</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="stat-card shadow">
                <Card.Body>
                  <h3>{services.length}</h3>
                  <p>Total Services</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Service Alerts and Quick Actions */}
          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Service Alerts</Card.Title>
                  {hasPendingServices ? (
                    <Alert variant="warning">
                      You have {services.length} pending services!
                    </Alert>
                  ) : (
                    <Card.Text>
                      No pending services. Your vehicle is up-to-date! 🚗
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Quick Actions</Card.Title>
                  <Link to="/book-service" className="btn btn-primary me-2">
                    Book Service
                  </Link>
                  <Link to="/add-vehicle" className="btn btn-outline-primary">
                    Add Vehicle
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Service Updates */}
          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Recent Service Updates</Card.Title>
                  <Link to="/service-updates" className="btn btn-primary">
                    View Updates
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Service Timeline */}
          <Row>
            <Col md={12} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Service Timeline</Card.Title>
                  <ServiceTimeline />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
