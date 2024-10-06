import React, { useState } from 'react';
import * as d3 from 'd3';

const spacecraftData = [
  { name: 'Atlas V 551', mass: 579.31 }, // in kg
  { name: 'Delta IV Heavy', mass: 833.22 },
  { name: 'Falcon Heavy', mass: 875.78 },
  { name: 'NASA SLS 2B', mass: 8589.12 },
];

const EarthDistanceAU = 1; // Earth's distance from the Sun in AU

const OrbitSimulator = ({ asteroidData }) => {
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
  const [numberOfLaunches, setNumberOfLaunches] = useState(1);
  const [deltaV, setDeltaV] = useState(0);
  const [deflectionResult, setDeflectionResult] = useState(null);
  const [simulationData, setSimulationData] = useState({
    semiMajorAxisAU: 0,
    eccentricity: 0,
    deflectedSemiMajorAxisAU: 0,
    deflectedEccentricity: 0,
  });

  const gravitationalConstant = 1.327e20; // μ (m^3/s^2)
  const AUtoMeters = 1.496e11; // Conversion from AU to meters

  // Handle asteroid selection from the dropdown
  const handleAsteroidChange = (event) => {
    const asteroid = asteroidData.find((a) => a.name === event.target.value);
    setSelectedAsteroid(asteroid);
    setSimulationData({
      semiMajorAxisAU: asteroid.semiMajorAxisAU,
      eccentricity: asteroid.eccentricity,
      deflectedSemiMajorAxisAU: asteroid.semiMajorAxisAU * 0.99, // Simulate deflection
      deflectedEccentricity: asteroid.eccentricity * 1.01, // Simulate deflection
    });
  };

  // Handle spacecraft selection from the dropdown
  const handleSpacecraftChange = (event) => {
    const spacecraft = spacecraftData.find((s) => s.name === event.target.value);
    setSelectedSpacecraft(spacecraft);
  };

  // Calculate DeltaV using the formula provided, considering spacecraft mass
  const calculateDeltaV = (r1_AU, r2_AU) => {
    const r1 = r1_AU * AUtoMeters; // Convert AU to meters
    const r2 = r2_AU * AUtoMeters; // Convert AU to meters
    const totalMass = selectedSpacecraft ? selectedSpacecraft.mass * numberOfLaunches : 0;

    // DeltaV calculation incorporating spacecraft mass
    const effectiveDeltaV = Math.sqrt(gravitationalConstant / r1) * (Math.sqrt(2 * r2 / (r1 + r2)) - 1) - totalMass / 10000; // Arbitrary scaling factor for example
    return effectiveDeltaV;
  };

  // Handle simulation when the user clicks "Simulate"
  const handleSimulate = () => {
    const r1_AU = simulationData.semiMajorAxisAU; // Initial semi-major axis in AU
    const r2_AU = simulationData.deflectedSemiMajorAxisAU; // Deflected semi-major axis in AU
    const calculatedDeltaV = calculateDeltaV(r1_AU, r2_AU);
    setDeltaV(calculatedDeltaV);

    // Check if the asteroid is on a collision course with Earth after deflection
    const willHitEarth = checkCollisionWithEarth(simulationData.deflectedSemiMajorAxisAU, simulationData.deflectedEccentricity);
    setDeflectionResult(willHitEarth ? "The asteroid is on a collision course with Earth!" : "The asteroid is not on a collision course with Earth.");

    drawOrbits(simulationData);
  };

  // Check if the asteroid will hit Earth
  const checkCollisionWithEarth = (deflectedSemiMajorAxis, deflectedEccentricity) => {
    // Calculate periapsis distance using the formula
    const periapsisDistance = deflectedSemiMajorAxis * (1 - deflectedEccentricity); // Closest point to the Sun
    return periapsisDistance < EarthDistanceAU; // If periapsis is less than 1 AU, it could hit Earth
  };

  // Function to draw orbits using d3.js
  const drawOrbits = (data) => {
    const svgCurrent = d3.select('#orbit-svg-current');
    svgCurrent.selectAll('*').remove(); // Clear previous orbits

    const svgNew = d3.select('#orbit-svg-new');
    svgNew.selectAll('*').remove(); // Clear previous orbits

    // SVG dimensions and orbit parameters
    const width = 250;
    const height = 250;
    const centerX = width / 2;
    const centerY = height / 2;

    // Define scales for drawing orbits
    const scale = d3.scaleLinear().domain([0, Math.max(data.semiMajorAxisAU, data.deflectedSemiMajorAxisAU)]).range([0, width / 2 - 10]);

    // Draw initial orbit in the current SVG
    svgCurrent.append('ellipse')
      .attr('cx', centerX + scale(data.semiMajorAxisAU * (1 - data.eccentricity)) / 2) // Positioning the orbit at one focus
      .attr('cy', centerY)
      .attr('rx', scale(data.semiMajorAxisAU) * (1 + data.eccentricity))
      .attr('ry', scale(data.semiMajorAxisAU) * (1 - data.eccentricity))
      .attr('stroke', 'lightblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('class', 'orbit-path');

    // Draw deflected orbit in the new SVG
    svgNew.append('ellipse')
      .attr('cx', centerX + scale(data.deflectedSemiMajorAxisAU * (1 - data.deflectedEccentricity)) / 2) // Positioning the orbit at one focus
      .attr('cy', centerY)
      .attr('rx', scale(data.deflectedSemiMajorAxisAU) * (1 + data.deflectedEccentricity))
      .attr('ry', scale(data.deflectedSemiMajorAxisAU) * (1 - data.deflectedEccentricity))
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('class', 'deflected-orbit-path');

    // Draw the sun at the focus of both orbits
    svgCurrent.append('circle')
      .attr('cx', centerX - 5) // Place the sun at one focus
      .attr('cy', centerY)
      .attr('r', 5)
      .attr('fill', 'yellow');

    svgNew.append('circle')
      .attr('cx', centerX - 5) // Place the sun at one focus
      .attr('cy', centerY)
      .attr('r', 5)
      .attr('fill', 'yellow');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h2 style={{ color: 'white', fontWeight: 'bold' }}>NEXO</h2> {/* Logo as Text */}
        <h1 style={{ textAlign: 'center', flex: 1 }}>Asteroid Orbit Simulator</h1>
      </header>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Input Section */}
      <div style={{ padding: '20px', maxWidth: '400px', overflowY: 'auto' }}>

        <label>Select a simulated asteroid:</label>
        <select onChange={handleAsteroidChange} value={selectedAsteroid?.name || ""}>
          <option value="">Select Asteroid</option>
          {asteroidData.map((asteroid) => (
            <option key={asteroid.name} value={asteroid.name}>
              {asteroid.name}
            </option>
          ))}
        </select>

        {selectedAsteroid && (
          <div>
            <h4>Selected Asteroid:</h4>
            <p1>Name: {selectedAsteroid.name}</p1><br></br>
            <p1>Semi-Major Axis: {selectedAsteroid.semiMajorAxisAU} AU</p1><br></br>
            <p1>Eccentricity: {selectedAsteroid.eccentricity}</p1>
          </div>
        )}

        <button onClick={handleSimulate} style={{ marginTop: "15px", padding: "15px", fontSize: "20px" }}>
            SIMULATE
        </button>

      </div>
      <div style={{ padding: '20px', maxWidth: '400px', overflowY: 'auto' }}>
        <label>Select a spacecraft:</label>
        <select onChange={handleSpacecraftChange} value={selectedSpacecraft?.name || ""}>
          <option value="">Select Spacecraft</option>
          {spacecraftData.map((spacecraft) => (
            <option key={spacecraft.name} value={spacecraft.name}>
              {spacecraft.name}
            </option>
          ))}
        </select>

        <label>Number of launches:</label>
        <input
          type="number"
          min="1"
          value={numberOfLaunches}
          onChange={(e) => setNumberOfLaunches(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", fontSize: "16px", width: "100%" }}
        />

        {selectedSpacecraft && (
          <div>
            <h4>Selected Spacecraft:</h4>
            <p1>Name: {selectedSpacecraft.name}</p1><br></br>
            <p1>Mass: {selectedSpacecraft.mass} kg</p1><br></br>
            <p1>Total Mass for Launches: {selectedSpacecraft.mass * numberOfLaunches} kg</p1><br></br>
          </div>
        )}

        {deltaV !== 0 && (
          <div>
            <h3 style={{ marginTop: "20px" }}>DeltaV: {deltaV.toFixed(2)} m/s</h3>
            <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)', padding: '10px', borderRadius: '8px' }}>
                <p style={{ color: 'blue', fontWeight: 'bold' }}>{deflectionResult}</p> {/* Display deflection result */}
            </div>
          </div>
        )}
      </div>

      {/* Orbit Visualization Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '400px' }}>
        <h3>Orbit Visualization</h3>

        <div className="orbit-container" style={{ width: '100%', margin: '10px 0', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
          <h4>Current Orbit</h4>
          <svg id="orbit-svg-current" width="350" height="300"></svg>
        </div>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '400px' }}>
        <h3>Orbit Visualization</h3>

        <div className="orbit-container" style={{ width: '100%', margin: '10px 0', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
          <h4>Deflected Orbit</h4>
          <svg id="orbit-svg-new" width="350" height="300"></svg>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrbitSimulator;