// In src/components/admin/ServiceUpdates.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ServiceUpdates() {
  const [formData, setFormData] = useState({
    serviceId: '',
    type: 'image',
    mediaUrl: '',
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      alert('Update added!');
      setFormData({ serviceId: '', type: 'image', mediaUrl: '', title: '', description: '' }); // Reset form
    });
  };

  return (
    <div className="p-4">
      <h3>Upload Service Update</h3>
      <Form onSubmit={handleSubmit}>
        {/* Add all form fields here */}
        <Button type="submit">Upload</Button> {/* Use the Button component */}
      </Form>
    </div>
  );
}

export default ServiceUpdates;