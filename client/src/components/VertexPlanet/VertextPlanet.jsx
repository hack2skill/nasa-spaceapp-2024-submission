import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import getStarfield from '../../../public/src/exoplanetJs/getStarfield'; 

const VertexPlanet = ({ selectedPlanet }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    let texture;
    
    const determineTexture = () => {
      const planetRadius = selectedPlanet?.stellarRadius;
      const distance = selectedPlanet?.distance;
      const eccentricity = selectedPlanet?.eccentricity;
      const equilibriumTemperature = selectedPlanet?.equilibriumTemperature;
      const stellarEffectiveTemp = selectedPlanet?.stellarEffectiveTemp;
      const orbitalPeriodDays = selectedPlanet?.orbitalPeriodDays;
      const mass = selectedPlanet?.mass;

      if (eccentricity > 0.2) {
        texture = textureLoader.load("/textures/exoplanet/8.png");
      } else if (equilibriumTemperature > 1000) {
        texture = textureLoader.load("/textures/exoplanet/1.png");
      } else if (equilibriumTemperature < 273 && equilibriumTemperature >= 1000) {
        texture = textureLoader.load("/textures/exoplanet/2.png");
      } else if (equilibriumTemperature < 273) {
        texture = textureLoader.load("/textures/exoplanet/5.png");
      } else if (planetRadius > 6 || mass > 100) {
        texture = textureLoader.load("/textures/exoplanet/3.png");
      } 
      if (stellarEffectiveTemp > 5000 && orbitalPeriodDays < 200) {
        // Hot and close to the star, intense activity
        texture = textureLoader.load("/textures/exoplanet/1.png");
    } else if (stellarEffectiveTemp < 5000 && orbitalPeriodDays > 300) {
    // Cooler star, long orbital period, thicker atmosphere
        texture = textureLoader.load("/textures/exoplanet/2.png");
    } else if (eccentricity > 0.5) {
        texture = textureLoader.load("/textures/exoplanet/3.png");
        // High eccentricity, chaotic orbits
    } else if (stellarEffectiveTemp > 6000) {
        texture = textureLoader.load("/textures/exoplanet/4.png");
        // Bright, hot star, close to the star
    } else if (orbitalPeriodDays > 1000) {
        texture = textureLoader.load("/textures/exoplanet/6.png");
        // Far from the star, cold planet
    } else if (stellarEffectiveTemp < 4000 && distance > 100) {
        texture = textureLoader.load("/textures/exoplanet/9.png");
        // Cold, distant planet
    } else {
        texture = textureLoader.load("/textures/exoplanet/7.png");
        // Default for unusual or desert-like conditions
    }
    };

    determineTexture();  // Call the function to select the texture

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Globe Mesh with selected texture
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);

    // Circular Line around the planet
    // const ringGeometry = new THREE.RingGeometry(1.2, 1.25, 64);
    // const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    // const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    // scene.add(ringMesh);

    // Properties Text at 7 Points around the ring\
    console.log(selectedPlanet);
    
    const planetProperties = [
      `1. Distance From Earth: ${selectedPlanet.distance} light years`,  `2. Mass:  ${selectedPlanet.mass} earth masses`, `3. Discovery Method:  ${selectedPlanet.discoveryMethod}`, 
      `4. Discovery Year:  ${selectedPlanet.discoveryYear}`, `5. Discovery Facility: ${selectedPlanet.discoveryFacility}`, 
       `6. Stellar Effective Temperature: ${selectedPlanet.stellarEffectiveTemp} Kelvins`,
       `7. Orbital Period Days ${selectedPlanet.orbitalPeriodDays}`
    ];

    const createTextSprite = (text, position) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
    
      const fontSize = 9; 
      context.font = `${fontSize}px "Source Code Pro", monospace`;
      context.fillStyle = 'white'; 
      // Measure text width and height
      const textWidth = context.measureText(text).width;
      const textHeight = fontSize;
    
      // Set canvas size
      canvas.width = (textWidth + 10); 
      canvas.height = (textHeight + 10); 
    
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw text
      context.fillStyle = 'white'; 
      context.fillText(text, 4, textHeight); 
    
      // Create a texture from the canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true; // Ensure the texture is updated
    
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      
      sprite.position.set(position.x, position.y, position.z);
      sprite.scale.set(1.2, 0.37, 1); 
    
      return sprite;
    };
    
    
    const angleIncrement = (2 * Math.PI) / planetProperties.length;
    planetProperties.forEach((property, index) => {
      const angle = index * angleIncrement;
      const x = Math.cos(angle) * 1.7; 
      const y = Math.sin(angle) * 1.5; 
      const textSprite = createTextSprite(property, new THREE.Vector3(x, y, 0)); 
      scene.add(textSprite);  
    });
    

    // Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 3);
    scene.add(hemiLight);

    // Starfield
    const stars = getStarfield({ numStars: 4500 });
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.002;
      controls.update();
      stars.rotation.y -= 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [selectedPlanet]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default VertexPlanet;
