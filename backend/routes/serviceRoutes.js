const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    // Add service to database
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Service creation failed' });
  }
});