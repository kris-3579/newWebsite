import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';


// Select the canvas correctly from the HTML document
const canvas = document.querySelector("#bg"); // Ensures Three.js renders on the existing <canvas class="bg">

// Create a new Three.js scene where objects will be added
const scene = new THREE.Scene();

// Get the width and height of the browser window
const w = window.innerWidth; // Full width of the viewport
const h = window.innerHeight; // Full height of the viewport

// Create a WebGL renderer with anti-aliasing enabled for smoother edges
const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas, // Attach the renderer to the existing canvas element
  antialias: true // Enables anti-aliasing to smooth out edges
});


// Set bg color
renderer.setClearColor(0x161616, 1);


// Set the renderer size to match the window dimensions
renderer.setSize(w, h);

// Set pixel ratio for better rendering on high-DPI screens (e.g., Retina displays)
renderer.setPixelRatio(window.devicePixelRatio);



// Create a perspective camera with a field of view of 75 degrees
// Aspect ratio is based on the window dimensions
// Objects closer than 0.1 or farther than 1000 units from the camera won't be rendered
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

// Position the camera 2 units away from the center along the Z-axis
// This ensures the objects are visible in the scene
camera.position.z = 2;

// Create an icosahedron (20-sided polyhedron) geometry with a radius of 1.0
// Subdivision level of 2 makes it smoother
const geo = new THREE.IcosahedronGeometry(0.1, 2);

// Create a basic mesh material with a light blue color and enable wireframe mode
const mat = new THREE.MeshBasicMaterial({
  color: 0xccff, // Hex color (light blue)
  wireframe: true // Enables wireframe mode, showing only the edges

});

const ico = new THREE.Mesh(geo, mat);

ico.scale.setScalar(3);

ico.position.x = 1.25

scene.add(ico);

const earth = new THREE.Mesh(geo, mat);



// const torusGeo = new THREE.TorusGeometry(10, 3,16, 100);
// const torusMat = new THREE.Material({color: 0xccff, wireframe: true});
// const torus = new THREE.Mesh(torusGeo, torusMat);

// scene.add(torus)





// Add the lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// Add the mesh (object) to the scene
//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;
//controls.autoRotate = true;


window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
 
});

const clock = new THREE.Clock();
let previousTime = 0;
// Define an animation loop function to keep rendering frames
function animate() {
  window.requestAnimationFrame(animate); // Requests the next frame for smooth animation
  // Rotate the icosahedron slightly on each frame for animation
  //group.rotation.x += 0.01; // Rotates around the X-axis
  //group.rotation.y += 0.01; // Rotates around the Y-axis
  //controls.update();

  ico.rotation.y += 0.01

  const currentTime = clock.getElapsedTime()

  
  // Render the updated scene with the camera
  renderer.render(scene, camera);
  
}

// Start the animation loop
animate();


// Dark Mode Toggle
const darkMode = document.querySelector(".sun-moon");
let toggle = false;

// SVG Paths for Sun and Moon
const sunPath = "M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z";
const moonPath = "M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z";

// Add event listener for click
darkMode.addEventListener("click", () => {
  const timeline = anime.timeline({
    duration: 750, // Duration of animation in milliseconds
    easing: "easeOutExpo", // Easing function
  });

  if (!toggle) {
    // Moon to Sun
    timeline.add({
      targets: ".moon",
      d: [{ value: sunPath }], // Morph moon into the sun
    }).add({
      targets: ".bg", // Fix: Use correct class selector
    });
    renderer.setClearColor(0xe6e6e6, 1); // Light gray (matches 'rgb(230,230,230)')
  } else {
    // Sun to Moon
    timeline.add({
      targets: ".moon",
      d: [{ value: moonPath }], // Morph sun back into the moon
    }, '-=350').add({
      targets: ".bg", // Fix: Use correct class selector
    });

    renderer.setClearColor(0x161616, 1); // Light gray (matches 'rgb(230,230,230)')
    
  }

  // Toggle the state
  toggle = !toggle;

  renderer.render(scene, camera);
});