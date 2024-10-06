import React from 'react';
import './TrackingNEO.css';
import neoImage from '../assets/images/asteroid.jpg';  // Adjust path if needed

const TrackingNEO = () => {
  const handleReadMore = () => {
    window.open('/about-app', '_blank'); // Update with the correct path to AboutNexo component
  };
  return (
    <section className="tracking-neo-section">
      <div className="content-container">
        <div className="decorative-number">02</div>
        <h3 className="section-subtitle">THE APP</h3>
        <h1 className="section-title">Tracking NEOs: Equip Yourself with Space Knowledge!</h1>
        <p className="section-description">
          Understanding the dynamic movement of Near-Earth Objects (NEOs) is key to exploring our cosmic neighborhood. 
          Learn how to use our app’s tools to track asteroids, comets, and potentially hazardous objects in real-time. 
          Equip yourself with the knowledge to identify and trace the paths of these celestial bodies as they orbit near Earth.
        </p>
        <a href="#read-more" className="read-more-link" onClick={handleReadMore}>read more <span>→</span></a>
      </div>
      <div className="image-container">
        <img src={neoImage} alt="Asteroid tracking" className="neo-image" />
      </div>
    </section>
  );
};

export default TrackingNEO;
