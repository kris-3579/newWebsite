import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Create the scene
const scene = new THREE.Scene();

// Set up an orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 100; // Defines how much of the world is visible

const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2, (frustumSize * aspect) / 2, // Left, Right
  frustumSize / 2, frustumSize / -2, // Top, Bottom
  0.1, 1000 // Near, Far clipping planes
);

// Set isometric rotation
const angle = Math.PI / 4; // 45 degrees
const heightAngle = Math.atan(1 / Math.sqrt(2)); // ~35.26 degrees

const distance = 30; // Increase distance for better view
camera.position.set(
  distance * Math.cos(angle), // X
  distance * Math.sin(heightAngle) * 3, // Y (higher to prevent cutoff)
  distance * Math.sin(angle) // Z
);
camera.lookAt(0, 0, 0);

// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define grid size
const gridSize = 100; // Size of the floor & grid
const tileSize = 5;  // Individual tile size
const halfGridSize = gridSize / 2;

// Create the green floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(gridSize, 0.1, gridSize), // Match grid size
  new THREE.MeshBasicMaterial({ color: 0x06402B })
);
floor.position.y = 0; // Keep floor at base level
scene.add(floor);

// Generate a tile-based checkerboard grid **on top** of the floor
for (let x = -halfGridSize + tileSize / 2; x < halfGridSize; x += tileSize) {
  for (let z = -halfGridSize + tileSize / 2; z < halfGridSize; z += tileSize) {
    const tile = new THREE.Mesh(
      new THREE.BoxGeometry(tileSize, 0.1, tileSize),
      new THREE.MeshBasicMaterial({ 
        color: (Math.floor(x / tileSize) + Math.floor(z / tileSize)) % 2 === 0 ? 0x555555 : 0x333333,
        transparent: true,
        opacity: 0.5
      })
    );

    tile.position.set(x, 0.05, z); // Align with floor
    scene.add(tile);
  }
}

// Add Player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0.5, 0); // Ensure player is above the floor
scene.add(player);

// Handle window resizing
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;

  camera.left = -frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function updateCamera() {
  // Maintain the same isometric angle but follow the player
  const offsetX = 20; // Distance from the player (adjust as needed)
  const offsetY = 30; // Height above the player
  const offsetZ = 20; // Distance in dept 

  camera.position.set(
    player.position.x + offsetX,
    player.position.y + offsetY,
    player.position.z + offsetZ
  )
  camera.lookAt(player.position.x, player.position.y, player.position.z);
}

// Player movement logic
const speed = 0.5; // Move exactly by one tile
const keys = {};

window.addEventListener('keydown', (event) => keys[event.code] = true);
window.addEventListener('keyup', (event) => keys[event.code] = false);

function updatePlayerMovement() {
  if (keys['ArrowUp']) player.position.z -= speed;
  if (keys['ArrowDown']) player.position.z += speed;
  if (keys['ArrowLeft']) player.position.x -= speed;
  if (keys['ArrowRight']) player.position.x += speed;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updatePlayerMovement();
  updateCamera();
  renderer.render(scene, camera);
}

animate();
