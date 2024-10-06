import React from 'react';
import './KineticSimulator.css';
import impactorImage from '../assets/images/orbiting.jpg'; // Ensure the image path is correct

const KineticSimulator = () => {
  const handleReadMore = () => {
    window.open('/orbitsimulator', '_blank'); // Update with the correct path to AboutNexo component
  };
  return (
    <section className="kinetic-simulator-section">
      <div className="content-container">
        <div className="decorative-number">03</div>
        <h3 className="section-title">Unlock the Secrets of Orbiting Objects</h3>
        <h1 className="main-title">NEXO’s Kinetic Impactor Deflection Simulator</h1>
        <p className="description">
          Experience the power of space missions with our interactive simulator. Select a Near-Earth Object 
          and experiment with impactor parameters to simulate deflecting its orbit. Visualize how the object's 
          path changes post-impact and use machine learning predictions to evaluate the probability of the 
          NEO hitting our home planet Earth.
        </p>
        <a className="read-more-link" onClick={handleReadMore}>read more <span>→</span></a>
      </div>
      <div className="image-container">
        <img src={impactorImage} alt="Kinetic impact simulation" className="kinetic-image" />
      </div>
    </section>
  );
};

export default KineticSimulator;
