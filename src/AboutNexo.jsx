import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutNexo.css';

const AboutNexo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      heading: 'About NEXO',
      content: 'In today’s world, where space exploration and planetary safety are more important than ever, NEXO is committed to bridging the gap between discovery, education, and defense. We are a team of space enthusiasts and innovators dedicated to providing real-time tracking and analysis of Near-Earth Objects (NEOs) while also offering educational resources to help everyone—from students to researchers—better understand the complexities of our solar system. Whether you’re a student curious about asteroids, a space enthusiast, or a researcher looking for in-depth NEO data, NEXO provides a comprehensive blend of science, safety, and space education. By combining real-time information, advanced technology, and educational outreach, we aim to inspire a new generation of space explorers while ensuring the security of our planet.'
    },
    {
      heading: 'NEOs',
      content: "Near-Earth Objects (NEOs) are comets and asteroids that have been drawn into Earth's vicinity due to the gravitational pull of nearby planets. Comets, primarily made of water ice mixed with dust particles, originated in the cold outer regions of the solar system, while rocky asteroids mostly formed in the warmer, inner regions between Mars and Jupiter. The scientific interest in these objects lies in the fact that they are relatively unchanged remnants from the formation of the solar system, about 4.6 billion years ago. The giant outer planets (Jupiter, Saturn, Uranus, and Neptune) were formed from the accumulation of billions of comets, and the leftover material from this process is what we observe today as comets. Similarly, present-day asteroids are the fragments left over from the formation of the inner planets, including Mercury, Venus, Earth, and Mars."
    }
  ];

  // Function to handle slide change
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Redirect to NASA website
  const handleRedirectToNASA = () => {
    window.location.href = 'https://www.nasa.gov'; // NASA's official website
  };

  return (
    <div className={`container ${currentSlide === 0 ? 'bg-slide-1' : 'bg-slide-2'}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" className='logo-text'>NEXO</Link>
        </div>

      {/* Content Section */}
      <div className="content">
        <h1 className="heading">{slides[currentSlide].heading}</h1>
        <p className="text">{slides[currentSlide].content}</p>
      </div>

      {/* Button Container */}
      <div className="button-container">
        {currentSlide === 0 ? (
          <button className="next-btn" onClick={handleNextSlide}>
            Next
          </button>
        ) : (
          <>
            <button className="prev-btn" onClick={() => setCurrentSlide(0)}>
              Previous
            </button>
            <button className="more-btn" onClick={handleRedirectToNASA}>
              More
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutNexo;
