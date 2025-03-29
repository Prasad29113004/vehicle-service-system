const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const ServiceUpdate = require('./models/ServiceUpdate');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/media', express.static(path.join(__dirname, '../frontend/public')));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Register API
app.post('/register', async (req, res) => {
  const { username, email, password, dateOfBirth, mobileNumber, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, dateOfBirth, mobileNumber, address });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware for admin authentication
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  });
};

// Add Service Update API
app.post('/api/service-updates', adminAuth, async (req, res) => {
  try {
    const { vehicleId, type, mediaUrl, title, description } = req.body;
    const update = await ServiceUpdate.create({ vehicleId, type, mediaUrl, title, description });
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Service Updates by Vehicle ID API
app.get('/api/service-updates/:vehicleId', async (req, res) => {
  try {
    const updates = await ServiceUpdate.find({ vehicleId: req.params.vehicleId });
    res.status(200).json(updates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logged-in user details
app.get('/api/users/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: decoded.email }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
