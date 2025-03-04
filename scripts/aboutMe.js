import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';


// Select the canvas correctly
const canvas = document.querySelector("#bg");


// Create a Three.js scene
const scene = new THREE.Scene();

// Get screen width and height
const w = window.innerWidth;
const h = window.innerHeight;

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true
});

// Set background color and size
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 30;

const pointLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight); // lightHelper
//const ambientLight = new THREE.AmbientLight(0xffffff); // lights scene equally


pointLight.position.set(0, 0 , - 10);
scene.add(pointLight);






function addStar() {
    const sphereGeo = new THREE.SphereGeometry(0.25, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(sphereGeo, sphereMat);

    const [x, y, z] =Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // Random float in the interval [- range / 2, range / 2].
    star.position.set(x, y, z);
    scene.add(star);
}

Array(300).fill().forEach(addStar);

//const spaceTexture = new THREE.TextureLoader().load('space.jpg')
//scene.background = spaceTexture;


window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
   
  });

  
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.y = t * -0.01;

}

document.body.onscroll = moveCamera



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();