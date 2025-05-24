import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import spline from './spline'

const mockPlaylist = [
  {
    title: "Pink + White",
    artist: "Frank Ocean",
    artwork: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*lfE1NRGhG2uwkAcRNGTq4g@2x.jpeg"
  },
  {
    title: "Nights",
    artist: "Frank Ocean",
    artwork: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*lfE1NRGhG2uwkAcRNGTq4g@2x.jpeg"
  },
  {
    title: "Lost",
    artist: "Frank Ocean",
    artwork: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*lfE1NRGhG2uwkAcRNGTq4g@2x.jpeg"
  },
  // Add more mock tracks here...
];

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
camera.position.z = 10;






// Add the lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// Add the mesh (object) to the scene
//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;
//controls.autoRotate = true;








const points = spline.getPoints(100);

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color: 0xff0000});
const line = new THREE.Line(geometry, material);

// create a tube geometry from the spline
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMat = new THREE.MeshStandardMaterial({
  color: 0x0099ff,
  side: THREE.DoubleSide,
  wireframe: true
});

const tube = new THREE.Mesh(tubeGeo, tubeMat);
scene.add(tube);

const clock = new THREE.Clock();
let previousTime = 0;

// const loader = new THREE.TextureLoader();
// mockPlaylist.forEach((track, i) => {
//   const p = (i / mockPlaylist.length + Math.random() * 0.1) % 1;
//   const pos = tubeGeo.parameters.path.getPointAt(p);
//   pos.x += Math.random() - 0.4;
//   pos.z += Math.random() - 0.4;

//   loader.load(track.artwork, (texture) => {
//     const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
//     const geo = new THREE.PlaneGeometry(0.7, 0.7);
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.copy(pos);
//     mesh.lookAt(camera.position); // Optional: make it face the camera
//     scene.add(mesh);
//   });
// });

const numBoxes = 55;
const size = 0.075;

const boxGeo = new THREE.BoxGeometry(size, size, size);
const boxMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});
for (let i = 0; i < numBoxes; i += 1) {
  
  const box = new THREE.Mesh(boxGeo, boxMat);
  const p = (i / numBoxes + Math.random() * 0.1) % 1; // this calculates a value p that represents a percentage along the path where p is number between 0 and 1
  const pos = tubeGeo.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;
  box.position.copy(pos);
  const rote = new THREE.Vector3(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  box.rotation.set(rote.x, rote.y, rote.z);
  const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
  const color = new THREE.Color().setHSL(0.7 - p, 1, 0.5);
  const lineMat = new THREE.LineBasicMaterial({ color });
  const boxLines = new THREE.LineSegments(edges, lineMat);
  boxLines.position.copy(pos);
  boxLines.rotation.set(rote.x, rote.y, rote.z);
  // scene.add(box);
  scene.add(boxLines);
}

function updateCamera(t) {
  const time = t * 0.04;
  const looptime = 8 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p+ 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}
// Define an animation loop function to keep rendering frames
function animate(t = 0) {
  window.requestAnimationFrame(animate); // Requests the next frame for smooth animation
  // Rotate the icosahedron slightly on each frame for animation
  //group.rotation.x += 0.01; // Rotates around the X-axis
  //group.rotation.y += 0.01; // Rotates around the Y-axis
  //controls.update();

  updateCamera(t);

  // Render the updated scene with the camera
  renderer.render(scene, camera);
  
}

// Start the animation loop
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
 
});

