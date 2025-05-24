import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
//import spline from '/scripts/spline.js'

const curvePath = [10.136184463414924, -1.374508746897471, 10.384881573913269,
	9.1152593889854714, -1.374508746897471, 8.5846792797570011,
	9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
	10.151040177840205, -0.65913653144937956, 3.4340491740541346,
	10.806779203170416, 1.8859391007298545, 0.46855774212986023,
	10.761433540147586, 2.8724172201359197, -1.2811838605587311,
	9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
	6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
	6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
	7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
	7.226367212900791, -1.8228856326635698, -10.499536640855691,
	5.8354566696263914, -1.8228856326635698, -12.039219379199908,
	3.6532357452141353, -0.20463983570573391, -13.87695442281038,
	-0.30169589630131455, 1.5965000671484342, -14.879986418947327,
	-2.8925694230502157, 2.2971364614427481, -13.892095587598131,
	-4.537672295357936, 4.5863515759659208, -12.140831652074551,
	-6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
	-6.0120301606452813, 4.4081161943855998, -6.712084358394045,
	-5.2138252159038974, 2.820894808418279, -4.4532820412085607,
	-2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
	-0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
	-0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
	-2.2174044353598896, 4.2415524507318576, 2.215992718290742,
	-3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
	-3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
	-3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
	-1.8851803760476225, 1.5269331003449989, 10.306083896408374,
	0.01071077144031829, 2.1101821577522295, 10.490880699847727,
	0.42562058195647001, 2.2759939598834387, 11.613129436580291,
	0.096405262182225115, 0.032317784084054391, 16.223455375061565,
	2.3458797884520433, 0.38907275257695584, 19.91188266079584,
	5.7018400098488771, 1.73337964747396, 20.615481586999959,
	7.9720939736751824, 1.73337964747396, 19.303399329816457,
	9.8672362721095652, 0.090083018057025177, 16.893338541618121,
	11.225959519544134, -1.374508746897471, 14.279002555560753,
	11.288646925965876, -1.374508746897471, 11.926359497447137,
	10.136184463414924, -1.374508746897471, 10.384881573913269
];

// construct tunnel track
const points = [];
const len = curvePath.length;
for (let p = 0; p < len; p += 3) {
  points.push(new THREE.Vector3(
    curvePath[p], 
    curvePath[p + 1], 
    curvePath[p + 2])
  );
}

const spline = new THREE.CatmullRomCurve3(points);

export default spline;

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








const points2 = spline.getPoints(100);

const geometry = new THREE.BufferGeometry().setFromPoints(points2);
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

