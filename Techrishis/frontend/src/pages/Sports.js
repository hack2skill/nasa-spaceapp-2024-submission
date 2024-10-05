import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from 'react-router-dom';
import './Sports.css';
import DottedButton from './DottedButton'; // Import your DottedButton component



const Sports = () => {
  const sportsData = [
    { id: 1, title: 'Badminton', image: require('../assets/sport1.png'), route: '/sports/badminton' },
    { id: 2, title: 'Football', image: require('../assets/sport2.png'), route: '/sports/football' },
    { id: 3, title: 'Tennis', image: require('../assets/sport3.png'), route: '/sports/tennis' },
    { id: 4, title: 'Cricket', image: require('../assets/sport4.png'), route: '/sports/cricket' },
    { id: 5, title: 'Basketball', image: require('../assets/sport5.jpg'), route: '/sports/basketball' },
  ];

  return (
    <div className="sports-page">
      <HorizontalScrollCarousel sportsData={sportsData} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ sportsData }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(null); // State to track hovered card

  useEffect(() => {
    // Start the motion
    if (isHovered === null) {
      controls.start({
        x: ["0%", "-33.33%"], 
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 5,
          },
        },
      });
    }
  }, [controls, isHovered]);

  // Duplicate data for infinite scroll effect
  const clonedSportsData = [...sportsData, ...sportsData, ...sportsData];

  // Pause the motion when a card is hovered
  const handleMouseEnter = (index) => {
    controls.stop(); // Halt motion
    setIsHovered(index); // Track the hovered card
  };

  const handleMouseLeave = () => {
    setIsHovered(null); // Reset hovered state
    controls.start({ // Resume motion
      x: ["0%", "-33.33%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 15,
        },
      },
    });
  };

  return (
    <div className="carousel-container">
      <motion.div animate={controls} className="carousel">
        {clonedSportsData.map((sport, index) => (
          <div
            className={`sport-card ${isHovered === index ? "enlarged" : ""}`} 
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={sport.image} alt={sport.title} className="sport-image" />
            <h3 className="sport-title">{sport.title}</h3>
            {isHovered === index && ( // Show button when hovered
              <Link to={sport.route}>
                <DottedButton text="Get Started" />
              </Link>
            )}
          </div>
        ))}
      </motion.div>

          
    </div>
  );
};

export default Sports;
