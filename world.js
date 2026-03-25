// ═══════════════════════════════════════════════════════
//   WORLD — builds and tears down levels
// ═══════════════════════════════════════════════════════

function buildLevel(idx) {
  // ─── Tear down previous level ───
  if (levelGroup) scene.remove(levelGroup);
  gameObjects.platforms = [];
  gameObjects.fishes = [];
  gameObjects.decorations = [];
  gameObjects.particles.forEach(p => scene.remove(p));
  gameObjects.particles = [];

  const lvl = LEVELS[idx];
  levelGroup = new THREE.Group();
  scene.add(levelGroup);

  // Sky & fog
  renderer.setClearColor(lvl.skyColor);
  scene.fog = new THREE.Fog(lvl.fogColor, 40, 120);

  // Water floor (visual death zone)
  const water = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), MAT.water);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -4;
  levelGroup.add(water);

  // Platforms
  lvl.platforms.forEach(p => {
    const mesh = makePlatform(p.x, p.y, p.z, p.w, p.h, p.d, p.mat || 'iceShiny', p.slip || false);
    levelGroup.add(mesh);
    gameObjects.platforms.push(mesh);
  });

  // Goal flag on the last platform
  const last = lvl.platforms[lvl.platforms.length - 1];
  addFlag(last.x, last.y + last.h / 2, last.z);

  // Fish
  lvl.fishes.forEach(f => {
    const fish = createFish(f.x, f.y, f.z);
    levelGroup.add(fish);
    gameObjects.fishes.push(fish);
  });

  // Background icebergs
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const dist  = 35 + Math.random() * 15;
    addIceberg(Math.cos(angle) * dist, -2, Math.sin(angle) * dist);
  }

  fishTotal     = lvl.fishes.length;
  fishCollected = 0;
  updateHUD();
}
