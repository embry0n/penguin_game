// ═══════════════════════════════════════════════════════
//   GAME — high-level flow: start, load, death, win/lose
// ═══════════════════════════════════════════════════════

function startGame() {
  currentLevel = 0;
  lives = 3;
  loadLevel(0);
  showScreen(null);
  gameState = 'playing';
}

function startFromLevel(idx) {
  currentLevel = idx;
  lives = 3;
  loadLevel(idx);
  showScreen(null);
  gameState = 'playing';
}

function loadLevel(idx) {
  if (penguin) scene.remove(penguin);

  buildLevel(idx);
  setupLighting();
  createSnowflakes();

  const spawn = LEVELS[idx].spawn;
  penguin = createPenguin();
  penguin.position.set(spawn.x, spawn.y, spawn.z);
  scene.add(penguin);

  updateHUD();
}

function showLevelComplete() {
  if (currentLevel >= LEVELS.length - 1) {
    gameState = 'win';
    showScreen('win-screen');
  } else {
    gameState = 'levelComplete';
    document.getElementById('level-stats').textContent =
      `Рыбы собраны: ${fishCollected} / ${fishTotal}\nУровень ${currentLevel + 1} пройден!`;
    showScreen('level-complete');
  }
}

function nextLevel() {
  currentLevel++;
  loadLevel(currentLevel);
  showScreen(null);
  gameState = 'playing';
}

function restartLevel() {
  showScreen(null);
  loadLevel(currentLevel);
  gameState = 'playing';
}

function restartGame() {
  currentLevel = 0;
  lives = 3;
  loadLevel(0);
  showScreen(null);
  gameState = 'playing';
}

function triggerDeath() {
  if (!penguin || penguin.userData.dead) return;
  penguin.userData.dead = true;
  lives--;
  spawnParticles(penguin.position.x, penguin.position.y + 1, penguin.position.z, 15, 0x4499ff);

  setTimeout(() => {
    if (lives <= 0) {
      lives = 3;
      gameState = 'gameOver';
      showScreen('game-over');
    } else {
      restartLevel();
    }
  }, 800);
}

// ─── Fish collection ───
function updateFishes() {
  gameObjects.fishes.forEach(fish => {
    if (fish.userData.collected) return;

    fish.userData.floatTime += 0.03;
    fish.position.y = fish.userData.baseY + Math.sin(fish.userData.floatTime) * 0.18;
    fish.rotation.y += 0.02;

    if (penguin) {
      const dx = penguin.position.x - fish.position.x;
      const dy = penguin.position.y - fish.position.y;
      const dz = penguin.position.z - fish.position.z;
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 1.2) collectFish(fish);
    }
  });
}

function collectFish(fish) {
  fish.userData.collected = true;
  fish.visible = false;
  spawnParticles(fish.position.x, fish.position.y, fish.position.z, 12, 0xff8c00);
  fishCollected++;
  updateHUD();
  if (fishCollected >= fishTotal) setTimeout(showLevelComplete, 800);
}

// ─── Particles update ───
function updateParticles() {
  for (let i = gameObjects.particles.length - 1; i >= 0; i--) {
    const p = gameObjects.particles[i];
    p.userData.vy -= 0.006;
    p.position.x += p.userData.vx;
    p.position.y += p.userData.vy;
    p.position.z += p.userData.vz;
    p.userData.life -= 0.025;
    p.material.opacity = p.userData.life;
    if (p.userData.life <= 0) {
      scene.remove(p);
      gameObjects.particles.splice(i, 1);
    }
  }
}

// ─── Decoration animations ───
function updateDecorations(t) {
  gameObjects.decorations.forEach(d => {
    if (d.userData.isFlag) d.rotation.z = Math.sin(t * 2) * 0.15;
  });
}
