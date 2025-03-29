import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const generateInvoice = () => {
    fetch('/api/admin/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500 }),
    }).then((res) => res.json())
      .then((data) => setInvoices([...invoices, data]));
  };

  return (
    <div className="p-4">
      <h3>Manage Invoices</h3>
      <Button onClick={generateInvoice} className="mb-3">Generate Invoice</Button>
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="mb-3 shadow">
          <Card.Body>
            <Card.Title>Invoice #{invoice.id}</Card.Title>
            <Card.Text>Amount: ₹{invoice.amount}</Card.Text>
            <img src={invoice.qrCode} alt="QR Code" width="100" />
            <Button className="ms-3">Mark as Paid</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Invoices;