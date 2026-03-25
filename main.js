// ═══════════════════════════════════════════════════════
//   MAIN — game loop and initialization
// ═══════════════════════════════════════════════════════

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const t  = clock.getElapsedTime();

  if (gameState === 'playing') {
    updatePenguin(dt);
    updateFishes();
    updateDecorations(t);
    updateParticles();
    updateCamera();
    updateSnowflakes();
  }

  renderer.render(scene, camera);
}

// ─── Boot ───
setupLighting();
createSnowflakes();
//govno
loadFishModel(() => {
  buildLevel(0);                 // строим уровень для фона (стартовый экран)
  penguin = createPenguin();
  penguin.position.set(0, 2, 0);
  scene.add(penguin);
  camera.position.set(0, 8, 14);
  animate();
});
//govno
showScreen('start-screen');

// Render level 0 as background on the start screen
// buildLevel(0);
// penguin = createPenguin();
// penguin.position.set(0, 2, 0);
// scene.add(penguin);
// camera.position.set(0, 8, 14);

// animate();
