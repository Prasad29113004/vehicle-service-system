import React, { useState, useEffect } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }
      
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in.');
        
        const response = await fetch(`/api/users/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  return (
    <Container className="mt-5">
      <h2>User Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <Card className="shadow">
          <Card.Body>
            <Card.Title>{profile.username || profile.name}</Card.Title>
            <Card.Text>Email: {profile.email}</Card.Text>
            <Card.Text>Mobile: {profile.mobileNumber}</Card.Text>
            <Card.Text>Vehicles: {profile.vehicles?.length || 0}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Failed to load profile</p>
      )}
    </Container>
  );
}

export default Profile;
