import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { planetData, constellations } from './data.js';

let scene, camera, renderer, controls, composer, loadingDiv, detailsDiv, progressBar;
const planets = {};
const asteroids = [];
let planetLabels = [];
let speed = 0.01;

let showAsteroids = true;
let showConstellations = true;

function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

    const starCount = 1000; // Number of stars
    const positions = new Float32Array(starCount * 3); // x, y, z for each star

    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000; // Random x position
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000; // Random y position
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000; // Random z position
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function init() {
    loadingDiv = document.getElementById("loading");
    detailsDiv = document.getElementById("details");
    progressBar = document.getElementById("progress-fill");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Set black background

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scene-container").appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    camera.position.set(0, 5, 10);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffcc00, 1.50, 10);
    scene.add(pointLight);

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Create star field background
    createStarField();

    // Load all textures and update progress
    const texturePromises = [];
    planetData.forEach(data => {
        texturePromises.push(loadTexture(data.texture));
    });

    Promise.all(texturePromises).then(() => {
        createSun();
        createOrbits();
        createPlanets();
        createAsteroids();
        createConstellations();
        createPlanetLabels(); // Create planet labels

        loadingDiv.style.display = 'none'; // Hide loading screen
        animate();
    });

    // Update progress bar
    let totalTextures = texturePromises.length;
    let loadedTextures = 0;

    function loadTexture(path) {
        return new Promise((resolve, reject) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                path,
                (texture) => {
                    loadedTextures++;
                    updateProgressBar(loadedTextures, totalTextures);
                    resolve(texture);
                },
                undefined,
                (err) => {
                    console.error(`Error loading texture: ${path}`, err);
                    reject(err);
                }
            );
        });
    }

    function updateProgressBar(loaded, total) {
        const progress = (loaded / total) * 100;
        progressBar.style.width = progress + '%';

        // Optionally, you can log or set a minimum loading time here
        if (loaded === total) {
            // Allow a brief moment to show completion
            setTimeout(() => {
                loadingDiv.style.display = 'none'; 
            }, 500); // Delay before hiding the loading screen
        }
    }
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunTextureLoader = new THREE.TextureLoader();

    sunTextureLoader.load("textures/sun.jpg", (texture) => {
        const sunMaterial = new THREE.MeshStandardMaterial({ map: texture });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);

        const glowGeometry = new THREE.SphereGeometry(1, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffcc00,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);

        sun.userData.glow = glow;
        scene.add(sun);
        scene.add(glow);
    }, undefined, (err) => {
        console.error("Error loading sun texture:", err);
    });
}

function createOrbits() {
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });

    planetData.forEach(data => {
        const orbitGeometry = new THREE.BufferGeometry();
        const points = [];

        const a = data.semiMajorAxis; // Semi-major axis

        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            const r = a * (1 - data.eccentricity * data.eccentricity) / (1 + data.eccentricity * Math.cos(angle)); // Distance from the focus
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle);
            points.push(x, 0, z);
        }

        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        scene.add(orbit);
    });
}

function createRing(planet, outerRadius, thickness, texturePath) {
    // Create the outer ring geometry
    const outerRingGeometry = new THREE.CylinderGeometry(outerRadius, outerRadius, thickness, 32);
    const ringTextureLoader = new THREE.TextureLoader();

    ringTextureLoader.load(texturePath, (texture) => {
        const outerRingMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });

        // Create the outer ring mesh
        const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
        outerRing.rotation.z = Math.PI; // Rotate to lay flat

        // Group the rings
        const ringGroup = new THREE.Group();
        ringGroup.add(outerRing);

        planet.add(ringGroup); // Make the ring group a child of the planet
    }, undefined, (err) => {
        console.error(`Error loading ring texture for ${planet.userData.name}:`, err);
    });
}

function createPlanets() {
    planetData.forEach(data => {
        const textureLoader = new THREE.TextureLoader();

        textureLoader.load(data.texture, (texture) => {
            const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const planet = new THREE.Mesh(geometry, material);

            planet.userData = {
                orbitAngle: 0,
                semiMajorAxis: data.semiMajorAxis,
                eccentricity: data.eccentricity,
                speed: data.speed
            };

            scene.add(planet);
            planets[data.name] = planet;
            if (data.name === "Saturn") {
                createRing(planet, 0.65, 0.1, "textures/saturn_ring.png");
            }

        }, undefined, (err) => {
            console.error(`Error loading texture for ${data.name}:`, err);
        });
    });
}

function createPlanetLabels() {
    planetData.forEach(data => {
        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = data.name;
        label.style.position = 'absolute';
        label.style.color = 'white';
        label.style.pointerEvents = 'none'; // Prevent interactions
        label.style.display = 'none'; // Start hidden
        document.body.appendChild(label);
        planetLabels.push(label);
        console.log(`Label created for ${data.name}`);
    });
}

function createAsteroids() {
    const asteroidGeometry = new THREE.OctahedronGeometry(0.05 + Math.random() * 0.1, 1);
    const textureLoader = new THREE.TextureLoader();

    const innerRadius = 5.7; // Between Mars (1.52 AU) and Jupiter (5.20 AU)
    const outerRadius = 6.2; // Adjust as needed for the belt thickness
    const heightVariation = 2.5;

    for (let i = 0; i < 50; i++) {
        textureLoader.load("textures/asteroid.jpg", (texture) => {
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const asteroid = new THREE.Mesh(asteroidGeometry, material);

            const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
            const angle = Math.random() * Math.PI * 2;

            asteroid.position.set(distance * Math.cos(angle), (Math.random() - 0.5) * heightVariation, distance * Math.sin(angle));
            scene.add(asteroid);
            asteroids.push(asteroid);
        });
    }
}

function createConstellations() {
    const constellationMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    constellations.forEach(constellation => {
        const points = [];
        constellation.stars.forEach(star => {
            points.push(new THREE.Vector3(star.position.x, star.position.y, star.position.z));
        });

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const constellationLine = new THREE.Line(geometry, constellationMaterial);
        scene.add(constellationLine);
    });
}

function animate() {
    requestAnimationFrame(animate);
    updatePlanets();
    controls.update();
    renderer.render(scene, camera);
}

function updatePlanets() {
    Object.values(planets).forEach(planet => {
        planet.userData.orbitAngle += speed * planet.userData.speed; // Update angle based on speed
        const a = planet.userData.semiMajorAxis;
        const e = planet.userData.eccentricity;
        const r = a * (1 - e * e) / (1 + e * Math.cos(planet.userData.orbitAngle)); // Distance from focus

        planet.position.x = r * Math.cos(planet.userData.orbitAngle);
        planet.position.z = r * Math.sin(planet.userData.orbitAngle);

        // Update labels position
        const labelIndex = planetData.findIndex(data => data.name === planet.userData.name);
        if (labelIndex !== -1) {
            const label = planetLabels[labelIndex];
            const labelPos = planet.position.clone().project(camera); // Project position to screen space
            label.style.left = `${(labelPos.x * 0.5 + 0.5) * window.innerWidth}px`;
            label.style.top = `${-(labelPos.y * 0.5 - 0.5) * window.innerHeight}px`;
            label.style.display = 'block'; // Show label
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();
