// src/components/ThreeScene.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import getStarfield from '../getStarfield';
import { getFresnelMat } from '../getFresnelMat'; // Assuming you have Fresnel shader material

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        mountRef.current.appendChild(renderer.domElement);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        // Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const loader = new THREE.TextureLoader();

        // Earth Group to hold Earth and clouds
        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        // Earth Geometry
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

        // Earth Day and Night Materials (Standard Material)
        const dayTexture = loader.load('../textures/8k_earth_daymap.jpg');
        const nightTexture = loader.load('../textures/8k_earth_nightmap.jpg');

        const earthMaterial = new THREE.MeshStandardMaterial({
            map: dayTexture,
            emissiveMap: nightTexture, // Use emissiveMap for night side
            emissive: new THREE.Color(0xffffff), // Emit light on the dark side
            emissiveIntensity: 0.6, // Reduced intensity
            roughness: 1,
            metalness: 0.1,
        });

        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthGroup.add(earthMesh);

        // Clouds around Earth
        const cloudsMaterial = new THREE.MeshStandardMaterial({
            map: loader.load('../textures/8k_earth_clouds.jpg'),
            transparent: true,
            opacity: 0.5,
        });
        const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMaterial);
        cloudsMesh.scale.set(1.01, 1.01, 1.01); // Slightly larger than Earth
        earthGroup.add(cloudsMesh);

        // Fresnel Effect for Glow around Earth (Reduced scale and intensity)
        const fresnelMaterial = getFresnelMat();
        const fresnelMesh = new THREE.Mesh(earthGeometry, fresnelMaterial);
        fresnelMesh.scale.set(1.02, 1.02, 1.02); // Reduced size
        earthGroup.add(fresnelMesh);

        // Realistic Asteroids (Enhanced visibility)
        const asteroidGroup = new THREE.Group();
        scene.add(asteroidGroup);

        const asteroidGeometry = new THREE.DodecahedronGeometry(0.95, 0);
        const createAsteroids = () => {
            const numAsteroids = 100;
            for (let i = 0; i < numAsteroids; i++) {
                const asteroidMaterial = new THREE.MeshStandardMaterial({
                    color: 0x555555, // Darker color for visibility
                    roughness: THREE.MathUtils.randFloat(0.5, 1),
                    metalness: THREE.MathUtils.randFloat(0, 0.3),
                });

                const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

                // Random positions, rotations, and sizes
                const distance = THREE.MathUtils.randFloat(2, 4);
                const angle = THREE.MathUtils.randFloat(0, Math.PI * 2);
                const yPosition = THREE.MathUtils.randFloat(-0.5, 0.5);
                const randomScale = THREE.MathUtils.randFloat(0.05, 0.15); // Larger scale
                asteroid.scale.set(randomScale, randomScale, randomScale);

                asteroid.position.set(
                    Math.cos(angle) * distance,
                    yPosition,
                    Math.sin(angle) * distance
                );
                asteroid.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                asteroidGroup.add(asteroid);
            }
        };

        createAsteroids();

        // Moon (Position adjusted and visible)
        const moonGroup = new THREE.Group();
        scene.add(moonGroup);
        const moonGeometry = new THREE.SphereGeometry(0.27, 64, 64); // Scaled down
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: loader.load('../textures/8k_moon.jpg'),
            bumpMap: loader.load('../textures/moonbump4k.jpg'),
            bumpScale: 0.1,
        });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(3, 0, 0); // Visible near Earth
        moonGroup.add(moonMesh);

        // Stars in the background
        const stars = getStarfield({ numStars: 2000 });
        scene.add(stars);

        // Lighting: Set Directional Light (Sunlight)
        const sunLight = new THREE.DirectionalLight(0xffffff, 2);
        sunLight.position.set(-2, 0.5, 1.5);
        scene.add(sunLight);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.002; // Earth rotation
            cloudsMesh.rotation.y += 0.0025; // Clouds rotate slightly faster
            fresnelMesh.rotation.y += 0.002; // Slight rotation on the glow
            asteroidGroup.rotation.y += 0.001; // Slowly rotate the asteroids
            moonGroup.rotation.y += 0.001;
            stars.rotation.y -= 0.0002;
            moonMesh.rotation.y += 0.001; // Moon rotation
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleWindowResize, false);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
    // return null;
};

export default ThreeScene;
