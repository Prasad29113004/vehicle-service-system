import React from 'react';

const ServiceUpdateCard = ({ status, image, title, date, technician, video }) => {
  return (
    <div className={`update-card ${status}`}>
      <div className="media-container">
        <img 
          src={`${process.env.PUBLIC_URL}/images/${image}`} 
          alt="Service Update" 
        />
        <div className="status-badge">
          {status === 'completed' ? '✅ Completed' : '🛠 In Progress'}
        </div>
      </div>
      
      <div className="update-details">
        <h3>{title}</h3>
        <p>{date} | Technician: {technician}</p>
        
        <div className="media-gallery">
          <video controls>
            <source 
              src={`${process.env.PUBLIC_URL}/videos/${video}`} 
              type="video/mp4" 
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default ServiceUpdateCard;