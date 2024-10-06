import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutNexo from './AboutNexo';
import OrbitInfo from './components/OrbitInfo';
import TrackingNEO from './components/TrackingNEO';
import KineticSimulator from './components/KineticSimulator';
import Footer from './components/Footer';
import Header from './components/Header'; 
import Hero from './components/Hero';
import ThreeScene from './components/ThreeScene';
import Simulator from './components/Simulator';
import OrbitSimulator from './components/orbitSimulator';

const asteroidData = [
  { name: 'PDC25', semiMajorAxisAU: 1.65, inclination: 11, eccentricity: 0.39 },
  { name: 'PDC23', semiMajorAxisAU: 0.99, inclination: 10, eccentricity: 0.09 },
  { name: 'PDC23a', semiMajorAxisAU: 0.99, inclination: 10, eccentricity: 0.09 },
  { name: 'PDC21', semiMajorAxisAU: 1.26, inclination: 16, eccentricity: 0.27 },
  { name: 'PDC19', semiMajorAxisAU: 1.92, inclination: 18, eccentricity: 0.53 },
  { name: 'PDC19a', semiMajorAxisAU: 1.92, inclination: 18, eccentricity: 0.53 },
  { name: 'PDC17a', semiMajorAxisAU: 2.24, inclination: 6, eccentricity: 0.61 },
  { name: 'PDC17', semiMajorAxisAU: 2.24, inclination: 6, eccentricity: 0.61 },
  { name: 'PDC15', semiMajorAxisAU: 1.78, inclination: 5, eccentricity: 0.49 },
  { name: 'PDC15a', semiMajorAxisAU: 1.78, inclination: 5, eccentricity: 0.49 },
  { name: 'TTX23', semiMajorAxisAU: 1.84, inclination: 12, eccentricity: 0.47 },
  { name: 'TTX22', semiMajorAxisAU: 1.26, inclination: 16, eccentricity: 0.27 },
  { name: 'TTTX19', semiMajorAxisAU: 1.84, inclination: 12, eccentricity: 0.53 },
  { name: 'SIM1', semiMajorAxisAU: 1.4, inclination: 23, eccentricity: 0.33 },
  { name: 'SIM2', semiMajorAxisAU: 2.06, inclination: 7, eccentricity: 0.58 },
  { name: 'SIM3', semiMajorAxisAU: 2.1, inclination: 1, eccentricity: 0.53 },
  { name: 'SIM4', semiMajorAxisAU: 1.96, inclination: 9, eccentricity: 0.5 },
  { name: 'SIMS', semiMajorAxisAU: 1.85, inclination: 6, eccentricity: 0.47 },
  { name: 'SIM6', semiMajorAxisAU: 1.57, inclination: 23, eccentricity: 0.35 },
  { name: 'SIM7', semiMajorAxisAU: 2.03, inclination: 37, eccentricity: 0.6 },
  { name: 'SIM8', semiMajorAxisAU: 2.54, inclination: 5, eccentricity: 0.61 },
  { name: 'SIM9', semiMajorAxisAU: 2.51, inclination: 4, eccentricity: 0.63 },
  { name: 'SIM10', semiMajorAxisAU: 0.81, inclination: 21, eccentricity: 0.32 },
  { name: 'SIM11', semiMajorAxisAU: 0.97, inclination: 5, eccentricity: 0.09 },
  { name: 'SIM12', semiMajorAxisAU: 0.88, inclination: 2, eccentricity: 0.15 },
  { name: 'TTX16', semiMajorAxisAU: 0.87, inclination: 6, eccentricity: 0.24 },
  { name: 'SIM13', semiMajorAxisAU: 0.99, inclination: 2, eccentricity: 0.1 },
  { name: 'SIM14', semiMajorAxisAU: 0.99, inclination: 5, eccentricity: 0.04 },
  { name: 'SIM15', semiMajorAxisAU: 0.99, inclination: 12, eccentricity: 0.34 },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for AboutNexo component */}
        <Route path="/about-nexo" element={<AboutNexo />} />
        <Route path="/about-app" element={<ThreeScene />} />
        <Route path="/about-simulator" element={<Simulator />} />
        <Route path="/orbitsimulator"element={<OrbitSimulator asteroidData={asteroidData} />}/>
        {/* All other routes that render Header, Hero, and other sections */}
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <section id="about">
              <OrbitInfo />
            </section>
            <section id="the-app">
              <TrackingNEO />
            </section>
            <section id="simulate">
              <KineticSimulator />
            </section>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
