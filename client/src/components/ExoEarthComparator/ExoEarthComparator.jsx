import React, { useState } from 'react';
import axios from 'axios';
import SearchBarEstimator from '../SearchBarEstimator/SearchBarEstimator';
import { Diff } from 'lucide-react';
import Plot from 'react-plotly.js'; // Importing Plotly React component
import './ExoEarthComparator.css';
import ComparatorPlanets from '../ComparatorPlanets/ComparatorPlanets';

const ExoEarthComparator = () => {
    const [planet1, setPlanet1] = useState(null);
    const [planet2, setPlanet2] = useState(null);
    const [planet1Data, setPlanet1Data] = useState(null);
    const [planet2Data, setPlanet2Data] = useState(null);
    const [isCompare, setIsCompare] = useState(false);

    const handlePlanetSelect1 = (selectedPlanet) => {
        setPlanet1(selectedPlanet);
    };

    const handlePlanetSelect2 = (selectedPlanet) => {
        setPlanet2(selectedPlanet);
    };

    const handleCompare = async () => {
        if (!planet1 || !planet2) {
            alert("Please select both planets to compare.");
            return;
        }

        try {
            // Fetch data for the first planet
            const response1 = await axios.post('https://exoearthcomparator.onrender.com/planets', { planet: planet1.label });
            const data1 = response1.data;

            // Fetch data for the second planet
            const response2 = await axios.post('https://exoearthcomparator.onrender.com/planets', { planet: planet2.label });
            const data2 = response2.data;

            // Prepare data for separate charts
            const trace1 = {
                x: data1.wavelengths,
                y: data1.transit_depth,
                mode: 'lines+markers',
                name: planet1.label,
                error_y: {
                    type: 'data',
                    array: data1.upper_error,
                    arrayminus: data1.lower_error,
                    visible: true,
                    color: '#d62728'
                },
                marker: { color: 'rgba(75, 192, 192, 1)' },
                line: { color: 'rgba(75, 192, 192, 1)' }
            };

            const trace2 = {
                x: data2.wavelengths,
                y: data2.transit_depth,
                mode: 'lines+markers',
                name: planet2.label,
                error_y: {
                    type: 'data',
                    array: data2.upper_error,
                    arrayminus: data2.lower_error,
                    visible: true,
                    color: '#2ca02c'
                },
                marker: { color: 'rgba(153, 102, 255, 1)' },
                line: { color: 'rgba(153, 102, 255, 1)' }
            };

            setPlanet1Data([trace1]);
            setPlanet2Data([trace2]);
            setIsCompare(true);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <main className='comparator section-p'>
            <div className="comparator-search">
                <SearchBarEstimator onSelectPlanet={handlePlanetSelect1} />
                <SearchBarEstimator onSelectPlanet={handlePlanetSelect2} />
            </div>
            
            <button className='comparator-compare-btn' onClick={handleCompare}>
                <Diff />
                Compare
            </button>
            <div className="comparison-result">
                {isCompare && (
                    <div className="comparison-details">
                        <h2>Comparative Details:</h2>
                        <div className="planet-details">
                            <div className="planet">
                                <h3>{planet1.label}</h3>
                                <p><strong>Distance from Earth:</strong> {planet1.distance} light years</p>
                                <p><strong>Mass:</strong> {planet1.mass}</p>
                                <p><strong>Discovery Method:</strong> {planet1.discoveryMethod}</p>
                                <p><strong>Discovery Year:</strong> {planet1.discoveryYear}</p>
                                <p><strong>Equilibrium Temperature:</strong> {planet1.equilibriumTemperature}</p>
                                <p><strong>Stellar Radius:</strong> {planet1.stellarRadius}</p>
                                <p><strong>Eccentricity:</strong> {planet1.eccentricity}</p>
                            </div>
                            <hr />
                            <div className="planet">
                                <h3>{planet2.label}</h3>
                                <p><strong>Distance from Earth:</strong> {planet2.distance} light years</p>
                                <p><strong>Mass:</strong> {planet2.mass}</p>
                                <p><strong>Discovery Method:</strong> {planet2.discoveryMethod}</p>
                                <p><strong>Discovery Year:</strong> {planet2.discoveryYear}</p>
                                <p><strong>Equilibrium Temperature:</strong> {planet2.equilibriumTemperature}</p>
                                <p><strong>Stellar Radius:</strong> {planet2.stellarRadius}</p>
                                <p><strong>Eccentricity:</strong> {planet2.eccentricity}</p>
                            </div>
                        </div>
                        <ComparatorPlanets planet1Data={planet1} planet2Data={planet2} />
                        <div className="comparison-chart-container">
                            {planet1Data && (
                                <div className="planet-chart">
                                    <Plot
                                        data={planet1Data}
                                        layout={{
                                            title: `${planet1.label} Transmission Spectrum`,
                                            xaxis: { title: 'Wavelength (nm)' },
                                            yaxis: { title: 'Transit Depth' },
                                            showlegend: true,
                                            paper_bgcolor: 'rgba(0, 0, 0, 0)', // Set paper background to none
                                            plot_bgcolor: 'rgba(0, 0, 0, 0)' // Set plot background to none
                                        }}
                                        config={{
                                            displayModeBar: false, // Disable the mode bar
                                            scrollZoom: false // Disable scroll zoom
                                        }}
                                        style={{ width: "100%", height: "600px" }}
                                    />
                                </div>
                            )}
                            {planet2Data && (
                                <div className="planet-chart">
                                    <Plot
                                        data={planet2Data}
                                        layout={{
                                            title: `${planet2.label} Transmission Spectrum`,
                                            xaxis: { title: 'Wavelength (nm)' },
                                            yaxis: { title: 'Transit Depth' },
                                            showlegend: true,
                                            paper_bgcolor: 'rgba(0, 0, 0, 0)', // Set paper background to none
                                            plot_bgcolor: 'rgba(0, 0, 0, 0)' // Set plot background to none
                                        }}
                                        config={{
                                            displayModeBar: false, // Disable the mode bar
                                            scrollZoom: false // Disable scroll zoom
                                        }}
                                        style={{ width: "100%", height: "600px" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ExoEarthComparator;
