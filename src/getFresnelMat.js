import * as THREE from "three";

// Function to create the Fresnel material
function getFresnelMat({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) {
  // Define uniforms for the shader
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) }, // Rim color
    color2: { value: new THREE.Color(facingHex) }, // Facing color
    fresnelBias: { value: 0.1 }, // Fresnel effect bias
    fresnelScale: { value: 1.0 }, // Fresnel effect scale
    fresnelPower: { value: 4.0 }, // Fresnel effect power
  };

  // Vertex shader code
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;

  varying float vReflectionFactor; // Varying to pass to the fragment shader

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

    vec3 I = worldPosition.xyz - cameraPosition; // View direction vector

    // Calculate the Fresnel factor
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

    gl_Position = projectionMatrix * mvPosition; // Final position of the vertex
  }
  `;

  // Fragment shader code
  const fs = `
  uniform vec3 color1; // Rim color
  uniform vec3 color2; // Facing color

  varying float vReflectionFactor; // Varying from vertex shader

  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 ); // Clamp the reflection factor
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f); // Mix colors based on the factor
  }
  `;

  // Create the ShaderMaterial using the shaders and uniforms
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms, // Set uniforms for the shaders
    vertexShader: vs, // Set vertex shader
    fragmentShader: fs, // Set fragment shader
    transparent: true, // Enable transparency
    blending: THREE.AdditiveBlending, // Use additive blending for the effect
  });

  return fresnelMat; // Return the created material
}

// Export the function to use it in the scene
export { getFresnelMat };
