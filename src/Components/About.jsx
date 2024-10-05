import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const [currentSection, setCurrentSection] = useState(0);

  // Content for the four parts
  const demoContent = [
    {
      title: 'Real-Time Anomaly Detection',
      description: 'AI continuously monitors spacecraft sensor data, instantly detecting anomalies like communication delays during missions.',
      bigimg: 'https://images.unsplash.com/photo-1581901811881-2695b594d5ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      smallimg:'https://images.unsplash.com/photo-1578222313807-5262ba891d7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Predictive Maintenance and Health Monitoring',
      description: 'AI predicts system health, anticipating future failures and recommending timely interventions, reducing downtime and enhancing mission success.',
      bigimg: 'https://images.unsplash.com/photo-1578222313807-5262ba891d7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      smallimg:'https://images.unsplash.com/photo-1581901811881-2695b594d5ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Autonomous Decision-Making Support',
      description: 'In emergencies, AI-driven systems suggest corrective actions in real-time, assisting mission control in critical decision-making.',
      bigimg: 'https://images.unsplash.com/photo-1447433909565-04bfc496fe73?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      smallimg:'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Adaptive Mission Planning',
      description: 'AI dynamically adjusts mission parameters like orbit correction and resource allocation, proposing adaptive strategies based on environmental changes.',
      bigimg: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      smallimg:'https://images.unsplash.com/photo-1447433909565-04bfc496fe73?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  // Auto-switching logic for the sections (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSection]);

  // Go to the next slide
  const nextSlide = () => {
    if (currentSection < demoContent.length - 1) {
      setCurrentSection((prevSection) => prevSection + 1);
    }
  };

  // Go to the previous slide
  const prevSlide = () => {
    if (currentSection > 0) {
      setCurrentSection((prevSection) => prevSection - 1);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1454789415558-bdda08f4eabb?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] text-white h-screen flex items-center justify-center p-4 sm:p-10 relative overflow-hidden">
      <div className="bg-[#2b2b2bd5] w-full max-w-5xl rounded-lg shadow-lg relative overflow-hidden">

        <div className="w-full flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentSection * 100}%)` }}>
          {demoContent.map((content, index) => (
            <div key={index} className="flex flex-col md:flex-row w-full flex-shrink-0">
              
              <div className="p-6 sm:p-10 flex-1">
                <h2 className="text-yellow-300 text-xl sm:text-2xl font-extrabold">{content.title}</h2>
                <p className="text-gray-400 uppercase mb-4 sm:mb-6 tracking-wider">Concepts and Reality</p>
                <p className="mb-4 leading-relaxed">{content.description}</p>
                <Link  to="/demo" className="px-4 py-2 sm:px-6 sm:py-2 bg-yellow-300 text-black font-semibold hover:bg-yellow-400 transition rounded-lg">
                  Explore Demo
                </Link>
              </div>
              {/* Image Section */}
              <div className="relative flex-1 hidden md:block">
                <img className="object-cover w-full h-full" src={content.bigimg} alt="Demo Image" />
                <div className="absolute top-0 right-0 text-xs text-gray-300">
                  <img src={content.smallimg} alt="Black Hole" className="w-32 h-24 sm:w-48 sm:h-32 object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className={`absolute left-4 sm:left-8 bg-yellow-300 p-2 rounded-full text-black hover:bg-yellow-400 transition z-10 ${currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentSection === 0}
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-4 sm:right-8 bg-yellow-300 p-2 rounded-full text-black hover:bg-yellow-400 transition z-10 ${currentSection === demoContent.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentSection === demoContent.length - 1}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Demo;
