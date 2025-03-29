const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/vehicle-data', authMiddleware, async (req, res) => {
  try {
    const vehicleData = await VehicleService.getData(req.user.id);
    res.json(vehicleData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});