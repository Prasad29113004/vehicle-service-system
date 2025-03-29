import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import PendingRequests from './PendingRequests';
import ServiceUpdates from './ServiceUpdates';
import Invoices from './Invoices';
import './styles/AdminDashboard.css';

function AdminDashboard() {
  return (
    <Tab.Container defaultActiveKey="requests">
      <Row>
        <Col sm={3} className="admin-sidebar">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="requests">Pending Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="updates">Service Updates</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="invoices">Invoices & Payments</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className="admin-content">
          <Tab.Content>
            <Tab.Pane eventKey="requests">
              <PendingRequests />
            </Tab.Pane>
            <Tab.Pane eventKey="updates">
              <ServiceUpdates />
            </Tab.Pane>
            <Tab.Pane eventKey="invoices">
              <Invoices />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default AdminDashboard;