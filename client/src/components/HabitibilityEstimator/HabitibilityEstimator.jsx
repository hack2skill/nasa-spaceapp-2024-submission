import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import SearchBarEstimator from '../SearchBarEstimator/SearchBarEstimator';
import './HabitabilityEstimator.css';
import { Eye, Send } from 'lucide-react';
import { BlockMath } from 'react-katex'; 
function HabitabilityEstimator() {
const [habitabilityScore, setHabitabilityScore] = useState(null);
const [scatterData, setScatterData] = useState([]);  // Holds the scatter data
const [regressionLine, setRegressionLine] = useState([]);  // Regression data
const [correlationMatrix, setCorrelationMatrix] = useState([]);  // Correlation matrix data
const [labels, setLabels] = useState([]);  // Labels for the correlation matrix
const [orbitData, setOrbitData] = useState(null);  // Orbit visualization data
const [kmeansClusters, setKmeansClusters] = useState(null);  // K-Means clustering data
const [selectedPlanet, setSelectedPlanet] = useState(null);  // Selected planet
const [isEyeBtn, setIsEyeBtn] = useState(false);
  const handleSubmit = async () => {
    if (!selectedPlanet) return;  // Ensure a planet is selected before submitting
    try {
      const response = await axios.post('https://habitibilityestimator.onrender.com/generate_visuals', 
        { planet: selectedPlanet.label });  // Sending selected planet's label

      setHabitabilityScore(response.data.habitability_score);
      setScatterData(response.data.scatter_data);
      setRegressionLine(response.data.regression_line);
      setCorrelationMatrix(response.data.correlation_matrix);
      setLabels(response.data.labels);
      setOrbitData(response.data.orbit_data);
      setKmeansClusters(response.data.kmeans_clusters);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="estimator section-p">
      <div className="predictor-fetch">
        <SearchBarEstimator onSelectPlanet={setSelectedPlanet} />
        <button onClick={handleSubmit}>
          <Send className='icon' />
          Submit
        </button>
      </div>
      
      {habitabilityScore && <div className="habitability-score">
        <h3>Habitability Score: {habitabilityScore !== null ? `${habitabilityScore} / 10` : 'Loading...'}</h3>
        <Eye className='formula-container-display-icon icon' onClick={()=>setIsEyeBtn(!isEyeBtn)}/>
      </div>
        }
        {isEyeBtn && <div className="formula-container">
            <div className="equation">
                <BlockMath>
                    {`T_{eq} = T_{star} \\times \\left( \\frac{R_{star}}{2 \\times a} \\right)^{0.5}`}
                </BlockMath>
            </div>
            
            <ul className='formula-calculation'>
                <li><strong>T<sub>eq</sub> Calculation:</strong> The equilibrium temperature is calculated using T<sub>star</sub>, R<sub>star</sub>, and a.</li>
                <li><strong>Temperature Condition:</strong> If the stellar temperature T<sub>star</sub> is between 2000 K and 7000 K, add 2 points.</li>
                <li><strong>Distance Condition:</strong> If the semi-major axis a (orbital distance) is between 0.5 AU and 1.5 AU, add 2 points.</li>
                <li><strong>Mass Condition:</strong> If the planet's mass is between 0.8 and 2.5 Earth masses, add 2 points.</li>
                <li><strong>Insolation Flux Condition:</strong> If the insolation flux S<sub>flux</sub> is between 0.5 and 1.5, add 2 points.</li>
                <li><strong>Total Score:</strong> The total habitability score is the sum of these conditions.</li>
            </ul>
        </div>
        }
      <div className="visualizations">
        {/* Scatter Plot */}
        {scatterData.length > 0 && (
          <div className='visualizations-container'>
            <h3>Scatter Plot (Orbital Period vs Mass)</h3>
            <Plot
              data={[
                {
                  x: scatterData.map(d => d['Orbital Period Days']),
                  y: scatterData.map(d => d['Mass']),
                  mode: 'markers',
                  marker: { size: 8, color: 'rgba(255, 99, 132, 0.8)' },
                  name: 'Planets',
                  type: 'scatter'
                },
                {
                  x: scatterData.map(d => d['Orbital Period Days']),
                  y: regressionLine,
                  mode: 'lines',
                  line: { color: 'rgba(75, 192, 192, 0.8)', width: 2 },
                  name: 'Regression Line'
                }
              ]}
              layout={{
                title: 'Scatter Plot (Orbital Period vs Mass)',
                xaxis: { title: 'Orbital Period (Days)' },
                yaxis: { title: 'Mass (Earth Masses)' },
                plot_bgcolor: 'rgba(0, 0, 0, 0)',  // Make plot background transparent
                paper_bgcolor: 'rgba(0, 0, 0, 0)', // Make paper background transparent
                dragmode: false,  // Disable zoom and pan
              }}
              config={{
                displayModeBar: false,  // Disable mode bar
              }}
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        )}

        {/* Heatmap */}
        {correlationMatrix.length > 0 && (
          <div className='visualizations-container'>
            <h3>Correlation Heatmap</h3>
            <Plot
              data={[{
                z: correlationMatrix,
                x: labels,
                y: labels,
                type: 'heatmap',
                colorscale: 'Viridis',
              }]}
              layout={{
                title: 'Correlation Heatmap',
                xaxis: { title: 'Variables' },
                yaxis: { title: 'Correlation' },
                plot_bgcolor: 'rgba(0, 0, 0, 0)',  // Make plot background transparent
                paper_bgcolor: 'rgba(0, 0, 0, 0)', // Make paper background transparent
              }}
              config={{
                displayModeBar: false,  // Disable mode bar
              }}
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        )}

        {/* Orbit Visualization */}
        {orbitData && orbitData.x.length > 0 && orbitData.y.length > 0 && (
          <div className='visualizations-container'>
            <h3>Orbit Visualization</h3>
            <Plot
              data={[{
                x: orbitData.x,
                y: orbitData.y,
                mode: 'lines',
                line: { color: 'rgba(75, 192, 192, 0.8)', width: 2 },
                name: 'Orbit'
              }]}
              layout={{
                title: 'Orbit Visualization',
                xaxis: { title: 'Distance from Star (AU)' },
                yaxis: { title: 'Orbital Distance (AU)' },
                aspectratio: { x: 3, y: 1 },
                plot_bgcolor: 'rgba(0, 0, 0, 0)',  // Make plot background transparent
                paper_bgcolor: 'rgba(0, 0, 0, 0)', // Make paper background transparent
              }}
              config={{
                displayModeBar: false,  // Disable mode bar
              }}
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        )}

        {/* K-Means Clustering */}
        {kmeansClusters && kmeansClusters.features && kmeansClusters.clusters.length > 0 && (
          <div className='visualizations-container'>
            <h3>K-Means Clustering (Mass vs Stellar Radius)</h3>
            <Plot
              data={[{
                x: kmeansClusters.features.map(f => f['Mass']),
                y: kmeansClusters.features.map(f => f['Stellar Radius']),
                mode: 'markers',
                marker: {
                  size: 10,
                  color: kmeansClusters.clusters,
                  colorscale: 'Viridis'
                },
                type: 'scatter',
                name: 'Clusters'
              }]}
              layout={{
                title: 'K-Means Clustering (Mass vs Stellar Radius)',
                xaxis: { title: 'Mass (Earth Masses)' },
                yaxis: { title: 'Stellar Radius (Solar Radii)' },
                plot_bgcolor: 'rgba(0, 0, 0, 0)',  // Make plot background transparent
                paper_bgcolor: 'rgba(0, 0, 0, 0)', // Make paper background transparent
              }}
              config={{
                displayModeBar: false,  // Disable mode bar
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default HabitabilityEstimator;
