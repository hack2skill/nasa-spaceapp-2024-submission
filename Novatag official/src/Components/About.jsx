import React, { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <>
      <div className="h-[84vh] flex items-center justify-center max-w-screen-xl mx-auto px-4 sm:px-10 overflow-hidden">
        {/* Left Side: Image Section */}
        <div
          className={`sm:w-1/2 p-10 hidden sm:flex justify-center transform transition-transform duration-1000 ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
        >
          <img
            src="logo.png"
            alt="NovaTAG Logo"
            className="w-[300px] h-auto filter drop-shadow-lg"
          />
        </div>

        {/* Right Side: Text Section */}
        <div
          className={`sm:w-1/2 w-full text-center sm:text-left transform transition-transform duration-1000 ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        >
          <h2 className="mb-6 font-bold text-3xl sm:text-4xl text-white">
            About <span className="text-cyan-400">NovaTAG</span>
          </h2>
          <p className="text-white text-lg leading-relaxed">
            Welcome to Novatag, where we explore the intriguing world of exoplanets! Our mission is to uncover the mysteries of planets beyond our solar system and share the wonders of space with enthusiasts and researchers alike.At Novatag, we are dedicated to providing up-to-date information on exoplanet discoveries, offering interactive tools for exploration, and fostering a community passionate about space science. Our team of astronomers, scientists, and enthusiasts work together to analyze data, visualize new findings, and make space exploration accessible to everyone.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
