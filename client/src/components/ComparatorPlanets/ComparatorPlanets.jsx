import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const ComparatorPlanets = ({ planet1Data, planet2Data }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load textures
    const textureLoader = new THREE.TextureLoader();

    const determineTexture = (planetData) => {
      if (!planetData) return textureLoader.load("/textures/exoplanet/1.png"); 
      const {
        stellarRadius,
        distance,
        eccentricity,
        equilibriumTemperature,
        stellarEffectiveTemp,
        orbitalPeriodDays,
        mass
      } = planetData;

      let texture;

      // Apply different textures based on the planet's properties
      if (eccentricity > 0.2) {
        texture = textureLoader.load("/textures/exoplanet/8.png");
      } else if (equilibriumTemperature > 1000) {
        texture = textureLoader.load("/textures/exoplanet/1.png");
      } else if (equilibriumTemperature < 273 && equilibriumTemperature >= 1000) {
        texture = textureLoader.load("/textures/exoplanet/2.png");
      } else if (equilibriumTemperature < 273) {
        texture = textureLoader.load("/textures/exoplanet/5.png");
      } else if (stellarRadius > 6 || mass > 100) {
        texture = textureLoader.load("/textures/exoplanet/3.png");
      } else if (stellarEffectiveTemp > 5000 && orbitalPeriodDays < 200) {
        texture = textureLoader.load("/textures/exoplanet/1.png");
      } else if (stellarEffectiveTemp < 5000 && orbitalPeriodDays > 300) {
        texture = textureLoader.load("/textures/exoplanet/2.png");
      } else if (eccentricity > 0.5) {
        texture = textureLoader.load("/textures/exoplanet/3.png");
      } else if (stellarEffectiveTemp > 6000) {
        texture = textureLoader.load("/textures/exoplanet/4.png");
      } else if (orbitalPeriodDays > 1000) {
        texture = textureLoader.load("/textures/exoplanet/6.png");
      } else if (stellarEffectiveTemp < 4000 && distance > 100) {
        texture = textureLoader.load("/textures/exoplanet/9.png");
      } else {
        texture = textureLoader.load("/textures/exoplanet/7.png");
      }
      return texture;
    };

    // Create a function that generates the planets using their respective data and applies textures
    const createPlanet = (planetData, position) => {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({ map: determineTexture(planetData) });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(position.x, position.y, position.z);
      scene.add(planet);
      return planet;
    };

    // Create planets using the provided planet data and apply appropriate textures
    const planet1 = createPlanet(planet1Data, { x: -4, y: 0, z: 0 });
    const planet2 = createPlanet(planet2Data, { x: 4, y: 0, z: 0 });

    // Lighting (Hemisphere light to illuminate the scene)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 3);
    scene.add(hemiLight);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 4500;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starPositions.set([x, y, z], i * 3);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation loop to rotate the planets and render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      planet1.rotation.y += 0.01;
      planet2.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler to ensure the scene adjusts when the window size changes
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [planet1Data, planet2Data]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '50vh' }} />
  );
};

export default ComparatorPlanets;
