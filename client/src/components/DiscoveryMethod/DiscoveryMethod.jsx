import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import './DiscoveryMethod.css';
import axios from 'axios';
import Select from 'react-select';
import CustomStyles from '../../styles/SearchBar/SearchBarStyle.js';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    ScatterChart,
    Scatter,
    LabelList,
} from 'recharts';
import { Eye, Send } from 'lucide-react';
import methodsData from './DiscoveryMethod.json';

function DiscoveryMethod() {
    const [simulatorData, setSimulatorData] = useState("");
    const [isResults, setIsResults] = useState(false);
    const [graphs, setGraphs] = useState({});
    const [error, setError] = useState(null);
    const [isEyeBtn, setIsEyeBtn] = useState(false);
    const options = [
        { value: 'Radial Velocity', label: 'Radial Velocity' },
        { value: 'Transit', label: 'Transit' },
        // { value: 'Direct Imaging', label: 'Direct Imaging' },
        { value: 'Microlensing', label: 'Microlensing' },
        { value: 'Astrometry', label: 'Astrometry' },
        { value: 'Disk Kinematics', label: 'Disk Kinematics' },
        { value: 'Orbital Brightness Modulation', label: 'Orbital Brightness Modulation' },
        { value: 'Pulsation Timing Variations', label: 'Pulsation Timing Variations' },
        { value: 'Transit Timing Variations', label: 'Transit Timing Variations' },
        { value: 'Pulsar Timing', label: 'Pulsar Timing' }
    ];

    const handleSubmit = async (e) => { 
        try {
            const response = await axios.post('https://discoveryanalyzer-1.onrender.com/generate_graphs', {
                method: simulatorData.value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setGraphs(response.data);
            console.log(response.data);

            playAnimation(simulatorData.value);
            setIsResults(true);
            setError(null);
        } catch (error) {
            console.error('Error sending data:', error);
            setError('Failed to fetch graphs. Please try again.');
        }
    };

    useEffect(() => {
        if (simulatorData && graphs) {
            playAnimation(simulatorData.value);
        }
    }, [simulatorData, graphs]);

    const findMethodDetails = (methodName) => {
        return methodsData.methods.find(method => method.name === methodName);
    };

    const selectedMethod = simulatorData.value ? findMethodDetails(simulatorData.value) : null;

    const getChartData = () => {
        if (!graphs.discovery_count) return [];

        const { x, y } = graphs.discovery_count;
        return x.map((year, index) => ({
            year,
            numberOfDiscoveries: y[index],
        }));
    };
    const getFacilityCountData = () => {
        if (!graphs.facility_count) return [];

        const { x, y } = graphs.facility_count;
        return x.map((label, index) => ({
            label,
            count: y[index],
        }));
    };

    const getScatterData = (data) => {
        if (!data) return [];

        const { x, y, color } = data;
        return x.map((val, index) => ({
            x: val,
            y: y[index],
            color: color || '#8884d8',
        }));
    };

    const prepareHistogramData = (data, nbins) => {
        // Check if data is an array and contains numeric values
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('Data is not a valid array or is empty.');
            return [];
        }
    
        // Filter to ensure data consists only of numbers
        const numericData = data.filter(value => typeof value === 'number');
    
        if (numericData.length === 0) {
            console.warn('No valid numeric data found.');
            return [];
        }
    
        const histogram = Array(nbins).fill(0);
        const min = Math.min(...numericData);
        const max = Math.max(...numericData);
        const binSize = (max - min) / nbins;
    
        numericData.forEach(value => {
            const binIndex = Math.floor((value - min) / binSize);
            if (binIndex >= 0 && binIndex < nbins) {
                histogram[binIndex]++;
            }
        });
    
        return histogram.map((count, index) => ({
            bin: `${(min + index * binSize).toFixed(2)} - ${(min + (index + 1) * binSize).toFixed(2)}`,
            count
        }));
    };
    

    return (
        <main className='predictor-container section-p'>
            <div className="predictor-fetch">
                <Select options={options} classNamePrefix="Select" styles={CustomStyles} onChange={(value) => setSimulatorData(value)} />
                <button onClick={handleSubmit}>
                    <Send className='icon' />
                    Submit
                </button>
            </div>
            {
                isResults &&
                <>
                    <div className='predictor-animator-title'>
                        <h2>Animation Output</h2>
                        <Eye className='formula-container-display-icon icon' onClick={()=>setIsEyeBtn(!isEyeBtn)}/>
                    </div>
                    {isEyeBtn && (
                        <div className="predictor-animation-content">
                            <p>{selectedMethod.explanation}</p>
                            <p>{selectedMethod.illustration_overview}</p>
                        </div>
                    )}
                    <div id="animation-output"></div>
                   
                    <div className="predictor-graphs">
                        {graphs.discovery_count && (
                            <div className='predictor-graphs-container'>
                                <h2>{graphs.discovery_count.title}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={getChartData()}>
                                        <XAxis
                                            dataKey="year"
                                            label={{ value: graphs.discovery_count.x_label || 'Discovery Year', position: 'insideBottomRight', offset: -5 }}
                                        />
                                        <YAxis
                                            label={{ value: graphs.discovery_count.y_label || 'Number of Discoveries', angle: -90, position: 'insideLeft' }}
                                        />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Line type="monotone" dataKey="numberOfDiscoveries" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {/* Facility Count Bar Chart */}
                        {graphs.facility_count && (
                            <div className='predictor-graphs-container'>
                                <h2>{graphs.facility_count.title}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={getFacilityCountData()}>
                                        <XAxis
                                            dataKey="label"
                                            label={{ value: graphs.facility_count.x_label || 'Facility', position: 'insideBottomRight', offset: -5 }}
                                        />
                                        <YAxis
                                            label={{ value: graphs.facility_count.y_label || 'Count', angle: -90, position: 'insideLeft' }}
                                        />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="count" fill="#82ca9d">
                                            <LabelList dataKey="count" position="top" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* Planetary Data Scatter Chart */}
                        {graphs.planetary_data && (
                            <div className='predictor-graphs-container'>
                                <h2>{graphs.planetary_data.title}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ScatterChart>
                                        <XAxis
                                            dataKey="x"
                                            label={{ value: graphs.planetary_data.x_label || 'X Axis', position: 'insideBottomRight', offset: -5 }}
                                        />
                                        <YAxis
                                            dataKey="y"
                                            label={{ value: graphs.planetary_data.y_label || 'Y Axis', angle: -90, position: 'insideLeft' }}
                                        />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter data={getScatterData(graphs.planetary_data)} fill="#8884d8" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* Stellar Data Scatter Chart */}
                        {graphs.stellar_data && (
                            <div className='predictor-graphs-container'>
                                <h2>{graphs.stellar_data.title}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ScatterChart>
                                        <XAxis
                                            dataKey="x"
                                            label={{ value: graphs.stellar_data.x_label || 'X Axis', position: 'insideBottomRight', offset: -5 }}
                                        />
                                        <YAxis
                                            dataKey="y"
                                            label={{ value: graphs.stellar_data.y_label || 'Y Axis', angle: -90, position: 'insideLeft' }}
                                        />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter data={getScatterData(graphs.stellar_data)} fill="#8884d8" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* Distance Data Histogram */}
                        {graphs.distance_data && (
                            <div className='predictor-graphs-container'>
                                <h2>{graphs.distance_data.title}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={prepareHistogramData(graphs.distance_data.x, graphs.distance_data.nbins)}>
                                        <XAxis 
                                            dataKey="bin" 
                                            label={{ value: graphs.distance_data.x_label, position: 'insideBottomRight', offset: -5 }} 
                                        />
                                        <YAxis 
                                            label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} 
                                        />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </>
            }
            {error && <p className="error">{error}</p>}
        </main>
    );
}

export default DiscoveryMethod;


let scene, camera, renderer, controls;

function setupScene() { 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });  

    renderer.setSize(600, 400);
    const animationOutput = document.getElementById('animation-output');
    if (animationOutput) {
        animationOutput.innerHTML = ''; 
        animationOutput.appendChild(renderer.domElement); 
    }

    // Add lighting for 3D effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1); 
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 10;

}


function playAnimation(method) {
    setupScene(); 

    switch (method) {
        case "Radial Velocity":
            animateRadialVelocity();
            break;
        case "Transit":
            animateTransit();
            break;
        case "Direct Imaging":
            animateDirectImaging();
            break;
        case "Microlensing":
            animateMicrolensing();
            break;
        case "Astrometry":
            animateAstrometry();
            break;
        case "Disk Kinematics":
            animateDiskKinematics();
            break;
        case "Orbital Brightness Modulation":
            animateOrbitalBrightnessModulation();
            break;
        case "Pulsation Timing Variations":
            animatePulsationTimingVariations();
            break;
        case "Transit Timing Variations":
            animateTransitTimingVariations();
            break;
        case "Pulsar Timing":
            animatePulsarTiming();
            break;
        default:
            console.log("Unknown method");
    }
}


function animateRadialVelocity() {
    // Clear previous lighting (optional, to avoid duplication)
    scene.clear(); // Use with caution if you want to reset the scene.

    // Re-add lighting for the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // Strong point light
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Add a second light source for more 3D realism
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Load texture for the star to give it a more realistic look
    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load('/textures/stars/circle.png');

    // Star geometry and material with texture and light interaction
    const starGeometry = new THREE.SphereGeometry(2, 64, 64); // Higher detail with more segments
    const starMaterial = new THREE.MeshStandardMaterial({
        map: starTexture, // Apply the texture to the star
        emissive: 0xffff00, // Give it an emissive glow
        emissiveIntensity: 0.8,
        roughness: 0.5, // Adjust roughness
        metalness: 0.5 // Adjust metalness
    });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    // Planet geometry and material with better detail
    const planetGeometry = new THREE.SphereGeometry(0.5, 64, 64); // Increase detail
    const planetMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ff00, 
        roughness: 0.7, // Adjust roughness
        metalness: 0.3 // Adjust metalness
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Enable shadows
    renderer.shadowMap.enabled = true;
    star.castShadow = true;
    star.receiveShadow = true;
    planet.castShadow = true;
    planet.receiveShadow = true;

    // Animation function to move the planet and star
    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        star.position.set(0, 0, 0); // Keeping the star stationary
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}



function animateTransit() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        if (planet.position.z < 0 && Math.abs(planet.position.x) < 1) {
            starMaterial.color.set(0xcccc00); // Dimming effect
        } else {
            starMaterial.color.set(0xffff00); // Reset brightness
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateDirectImaging() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    const coverGeometry = new THREE.CircleGeometry(2.5, 32);
    const coverMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    cover.position.set(0, 0, 0.1);
    scene.add(cover);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        cover.rotation.z = time * 0.5;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateMicrolensing() {
    const distantStarGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const distantStarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const distantStar = new THREE.Mesh(distantStarGeometry, distantStarMaterial);
    scene.add(distantStar);
    distantStar.position.set(0, 0, -10);

    const nearbyStarGeometry = new THREE.SphereGeometry(2, 32, 32);
    const nearbyStarMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const nearbyStar = new THREE.Mesh(nearbyStarGeometry, nearbyStarMaterial);
    scene.add(nearbyStar);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        if (Math.abs(planet.position.x) < 1 && planet.position.z < 0) {
            distantStar.scale.set(1.5, 1.5, 1.5);
        } else {
            distantStar.scale.set(1, 1, 1);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateAstrometry() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        star.position.set(Math.sin(time) * 0.1, 0, Math.cos(time) * 0.1);

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateDiskKinematics() {
    const starGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const diskGeometry = new THREE.RingGeometry(2, 6, 32);
    const diskMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    scene.add(disk);

    disk.rotation.x = Math.PI / 2;

    function animate() {
        disk.rotation.z += 0.01;
        if (disk.rotation.z % 1 > 0.5) {
            disk.scale.set(1.1, 1.1, 1.1);
        } else {
            disk.scale.set(1, 1, 1);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateOrbitalBrightnessModulation() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        const distanceFromStar = planet.position.length();
        const brightness = 1 - (distanceFromStar / 5);
        starMaterial.color.setRGB(brightness, brightness, 0);

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animatePulsationTimingVariations() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        const pulseRate = 1 + Math.sin(time * 5);
        star.scale.set(pulseRate, pulseRate, pulseRate);

        if (Math.abs(planet.position.x) < 1 && planet.position.z < 0) {
            star.scale.set(1.5, 1.5, 1.5);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animateTransitTimingVariations() {
    const starGeometry = new THREE.SphereGeometry(2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planet1Geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planet1Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet1 = new THREE.Mesh(planet1Geometry, planet1Material);
    scene.add(planet1);

    const planet2Geometry = new THREE.SphereGeometry(0.4, 32, 32);
    const planet2Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const planet2 = new THREE.Mesh(planet2Geometry, planet2Material);
    scene.add(planet2);

    function animate() {
        const time = Date.now() * 0.001;
        planet1.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        planet2.position.set(Math.sin(time * 0.8) * 7, 0, Math.cos(time * 0.8) * 7);

        if (Math.abs(planet1.position.x - planet2.position.x) < 1) {
            planet1.position.set(Math.sin(time) * 5.2, 0, Math.cos(time) * 5.2);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function animatePulsarTiming() {
    const pulsarGeometry = new THREE.SphereGeometry(2, 32, 32);
    const pulsarMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const pulsar = new THREE.Mesh(pulsarGeometry, pulsarMaterial);
    scene.add(pulsar);

    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    const waveMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const waveGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -10)]);
    const wave = new THREE.Line(waveGeometry, waveMaterial);
    scene.add(wave);

    function animate() {
        const time = Date.now() * 0.001;
        planet.position.set(Math.sin(time) * 5, 0, Math.cos(time) * 5);
        wave.rotation.y = time * 5;

        if (Math.abs(planet.position.x) < 1 && planet.position.z < 0) {
            wave.scale.set(1.5, 1.5, 1.5);
        } else {
            wave.scale.set(1, 1, 1);
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}