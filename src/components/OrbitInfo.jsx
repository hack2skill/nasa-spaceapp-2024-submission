import React from 'react';
import { Link } from 'react-router-dom';
import './OrbitInfo.css';
import telescopeImage from '../assets/images/telescope.png';  // Adjust path if needed

const OrbitInfo = () => {
    const handleReadMore = () => {
        window.open('/about-nexo', '_blank'); // Update with the correct path to AboutNexo component
      };
  return (
    <section className="orbit-info-section">
      <div className="content-container">
        <div className="decorative-number">01</div>
        <h3 className="section-subtitle">ABOUT</h3>
        <h1 className="section-title">Explore the Orbits That Influence Our Planet!</h1>
        <p className="section-description">
          Our app is designed to bridge the gap between Earth and the vast expanse of space, offering an interactive platform to explore 
          Near-Earth Objects (NEOs) such as asteroids and comets. By providing real-time tracking of celestial bodies and their orbits, 
          we aim to educate users about the dynamic environment of our cosmic neighborhood. With a user-friendly interface, you can visualize 
          and understand the paths of potentially hazardous objects, empowering you to stay informed about space events that could impact our planet. 
          Join us in navigating the cosmos and unlocking the mysteries of Near-Earth space!
        </p>
        <a href="#read-more" className="read-more-link" onClick={handleReadMore}>read more <span>→</span></a>
      </div>
      <div className="image-container">
        <img src={telescopeImage} alt="Man observing stars with telescope" className="telescope-image" />
      </div>
    </section>
  );
};

export default OrbitInfo;
