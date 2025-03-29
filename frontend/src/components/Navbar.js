import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomNavbar = () => {
  const { currentUser } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          VehicleCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="mx-2">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">
              Contact
            </Nav.Link>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="mx-2">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="mx-2">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/add-service" className="mx-2">
                  Add Service
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light mx-2">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
