// ═══════════════════════════════════════════════════════
//   CORE — renderer, scene, camera, shared state
// ═══════════════════════════════════════════════════════

const canvas = document.getElementById('game-canvas');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x87ceeb);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87ceeb, 30, 120);

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 8, 14);

const clock = new THREE.Clock();

// ─── Shared game state ───
let gameState = 'menu'; // menu | playing | paused | levelComplete | gameOver | win
let currentLevel = 0;
let lives = 3;
let fishCollected = 0;
let fishTotal = 0;

let gameObjects = { platforms: [], fishes: [], decorations: [], particles: [] };
let penguin = null;
let levelGroup = null;

// ─── Input ───
const keys = {};
window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup',   e => { keys[e.code] = false; });

// ─── Resize ───
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
