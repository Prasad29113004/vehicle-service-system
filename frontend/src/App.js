import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Services from './components/Services';
import Dashboard from './components/Dashboard';
import BookService from './components/BookService';
import AddVehicle from './components/AddVehicle';
import MyVehicles from './components/MyVehicles';
import ServiceHistory from './components/ServiceHistory';
import Profile from './components/Profile';
import EditVehicle from './components/EditVehicle';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import ServiceTimeline from './components/ServiceTimeline/ServiceTimeline';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddService from './components/AddService';
import './App.css';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="/book-service" element={<BookService />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/vehicles" element={<MyVehicles />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path="/edit-vehicle/:vin" element={<EditVehicle />} />

        {/* Protected User Routes */}
        <Route path="/service-timeline" element={
          <ProtectedRoute>
            <ServiceTimeline />
          </ProtectedRoute>
        } />

        <Route path="/add-service" element={
          <ProtectedRoute>
            <AddService />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;