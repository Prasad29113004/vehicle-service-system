import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './styles/ServiceTimeline.css';

const ServiceTimeline = () => {
  const { currentUser } = useAuth();
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch('/api/vehicle-data', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        const data = await response.json();
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentUser) {
      fetchVehicleData();
    }
  }, [currentUser]);

  return (
    <div className="service-timeline">
      {/* Vehicle Header Section */}
      <div className="vehicle-header">
        <div className="vehicle-info">
          <h1>
            <span role="img" aria-label="Maintenance">🛠️</span> 
            Your Car: {vehicleData?.vehicleNumber || 'Loading...'} ({vehicleData?.model || 'Unknown Model'})
          </h1>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: '65%' }}></div>
          </div>
          <span className="progress-text">65% Completed</span>
        </div>
      </div>

      {/* Service Items */}
      <div className="service-items">
        {/* Completed Service */}
        <div className="service-card completed">
          <div className="status-indicator">
            <span className="status-badge">
              <span role="img" aria-label="Completed">✅</span> Completed
            </span>
            <span className="service-type">Engine Maintenance</span>
          </div>
          
          <div className="service-details">
            <h3>Engine Oil Change</h3>
            <div className="meta-info">
              <span>25 March 2024</span>
              <span className="divider">|</span>
              <span>Technician: Rajesh Kumar</span>
            </div>
            
            <div className="media-container">
              <video controls poster={`${process.env.PUBLIC_URL}/images/oil-change-thumb.jpg`}>
                <source 
                  src={`${process.env.PUBLIC_URL}/videos/engine-service.mp4`} 
                  type="video/mp4" 
                />
              </video>
              <div className="media-caption">
                <span className="timestamp">0:00</span>
                <span className="caption">Replaced Filter</span>
              </div>
            </div>

            <p className="service-description">
              Full synthetic oil replacement with new OEM filter
            </p>
          </div>
        </div>

        {/* In-Progress Service */}
        <div className="service-card in-progress">
          <div className="status-indicator">
            <span className="status-badge">
              <span role="img" aria-label="In Progress">🛠</span> In Progress
            </span>
            <span className="service-type">Brake Maintenance</span>
          </div>
          
          <div className="service-details">
            <h3>Brake System Overhaul</h3>
            <div className="meta-info">
              <span>Est. Completion: 28 March 2024</span>
              <span className="divider">|</span>
              <span>Technician: Ankit Sharma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTimeline;