import * as THREE from "three";

// Define the function that creates a starfield
export default function getStarfield({ numStars = 500 } = {}) {
  // Function to generate a random point in a sphere
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25; // Random distance from the center
    const u = Math.random(); // Random value for the spherical coordinate
    const v = Math.random(); // Random value for the spherical coordinate
    const theta = 2 * Math.PI * u; // Angle around the Y-axis
    const phi = Math.acos(2 * v - 1); // Angle from the Z-axis

    // Convert spherical coordinates to Cartesian coordinates
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z), // Position as a THREE.Vector3
      hue: 0.6, // Fixed hue for color (could be modified)
      minDist: radius, // Minimum distance from the center
    };
  }

  const verts = []; // Array to hold vertex positions
  const colors = []; // Array to hold colors for each vertex
  const positions = []; // Array to hold star positions

  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint(); // Get a random point in the sphere
    const { pos, hue } = p; // Destructure the position and hue

    // Store vertex position
    positions.push(p);
    // Create a color using HSL
    const col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    // Add the position to the vertices array
    verts.push(pos.x, pos.y, pos.z);
    // Add the color to the colors array
    colors.push(col.r, col.g, col.b);
  }

  // Create geometry for the points
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3)); // Set positions attribute
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3)); // Set colors attribute

  // Create a material for the points
  const mat = new THREE.PointsMaterial({
    size: 0.2, // Size of each point
    vertexColors: true, // Use vertex colors from the geometry
    map: new THREE.TextureLoader().load("./textures/stars/circle.png"), // Texture for the points
  });

  // Create points and return them
  const points = new THREE.Points(geo, mat);
  return points; // Return the points object to be added to the scene
}
