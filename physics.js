// ═══════════════════════════════════════════════════════
//   PHYSICS — penguin movement, collision, camera follow
// ═══════════════════════════════════════════════════════

const GRAVITY       = -0.018;
const WALK_SPEED    =  0.065;  // slow — penguin waddle
const SLIDE_SPEED   =  0.13;   // fast — belly slide
const SLIDE_FRICTION = 0.985;  // very slippery
const NORMAL_FRICTION = 0.72;
const SLIP_FRICTION  = 0.97;   // slippery platform
const JUMP_FORCE    =  0.52;

function updatePenguin(dt) {
  if (!penguin || gameState !== 'playing') return;
  const d = penguin.userData;
  if (d.dead) return;

  const isSliding = keys['ShiftLeft'] || keys['ShiftRight'];

  // ─── Read input ───
  let inputX = 0, inputZ = 0;
  if (keys['KeyW'] || keys['ArrowUp'])    inputZ = -1;
  if (keys['KeyS'] || keys['ArrowDown'])  inputZ =  1;
  if (keys['KeyA'] || keys['ArrowLeft'])  inputX = -1;
  if (keys['KeyD'] || keys['ArrowRight']) inputX =  1;

  const hasInput = inputX !== 0 || inputZ !== 0;
  if (inputX !== 0 && inputZ !== 0) { inputX *= 0.707; inputZ *= 0.707; }

  // ─── Belly slide ───
  if (isSliding && d.onGround && !d.isSliding && hasInput) {
    d.isSliding = true;
    d.slideTime = 0;
    d.slideDir = { x: inputX, z: inputZ };
    d.vx += inputX * SLIDE_SPEED;
    d.vz += inputZ * SLIDE_SPEED;
    penguin.rotation.x = 1.2;
    penguin.position.y -= 0.25;
    spawnParticles(penguin.position.x, penguin.position.y + 0.3, penguin.position.z, 5, 0xaaddff);
  }

  if (d.isSliding) {
    d.slideTime += dt;
    d.vx *= SLIDE_FRICTION;
    d.vz *= SLIDE_FRICTION;
    if (!isSliding || d.slideTime > 2.5 || !d.onGround) {
      d.isSliding = false;
      penguin.rotation.x = 0;
    }
  } else {
    // ─── Walk ───
    if (d.onGround) {
      d.vx += inputX * WALK_SPEED;
      d.vz += inputZ * WALK_SPEED;

      if (hasInput) {
        d.wobbleTime += dt * 8;
        penguin.rotation.z = Math.sin(d.wobbleTime) * 0.18;
        penguin.rotation.x = Math.sin(d.wobbleTime * 0.5) * 0.05;
        penguin.position.y += Math.abs(Math.sin(d.wobbleTime)) * 0.015;
      } else {
        penguin.rotation.z *= 0.85;
      }
    } else {
      // minimal air control — penguins can't fly!
      d.vx += inputX * WALK_SPEED * 0.2;
      d.vz += inputZ * WALK_SPEED * 0.2;
    }

    // ─── Jump ───
    if (keys['Space'] && d.onGround) {
      d.vy = JUMP_FORCE;
      d.onGround = false;
      spawnParticles(penguin.position.x, penguin.position.y, penguin.position.z, 4, 0xffffff);
    }
  }

  // ─── Gravity ───
  d.vy += GRAVITY;

  // ─── Horizontal friction ───
  if (d.onGround) {
    const plat = getStandingPlatform();
    const friction = (plat && plat.userData.isSlippery) ? SLIP_FRICTION
                   : d.isSliding                        ? SLIDE_FRICTION
                   : NORMAL_FRICTION;
    d.vx *= friction;
    d.vz *= friction;
  } else {
    d.vx *= 0.98;
    d.vz *= 0.98;
  }

  // ─── Clamp horizontal speed ───
  const maxH = d.isSliding ? 0.18 : 0.10;
  d.vx = Math.max(-maxH, Math.min(maxH, d.vx));
  d.vz = Math.max(-maxH, Math.min(maxH, d.vz));

  // ─── Apply velocity ───
  penguin.position.x += d.vx;
  penguin.position.y += d.vy;
  penguin.position.z += d.vz;

  // ─── Facing direction ───
  if (Math.abs(d.vx) > 0.002 || Math.abs(d.vz) > 0.002) {
    const target = Math.atan2(d.vx, d.vz);
    let diff = target - d.facingAngle;
    while (diff >  Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    d.facingAngle += diff * 0.15;
    if (!d.isSliding) penguin.rotation.y = d.facingAngle;
  }

  // ─── Platform collision ───
  d.onGround = false;
  gameObjects.platforms.forEach(plat => {
    const pd = plat.userData;
    const margin = 0.4;
    const px = penguin.position.x;
    const py = penguin.position.y;
    const pz = penguin.position.z;

    if (px > pd.minX - margin && px < pd.maxX + margin &&
        pz > pd.minZ - margin && pz < pd.maxZ + margin) {
      if (py > pd.top - 0.1 && py < pd.top + 0.6 && d.vy <= 0) {
        penguin.position.y = pd.top + (d.isSliding ? 0.25 : 0.5);
        d.vy = 0;
        d.onGround = true;
      }
    }
  });

  // ─── Fall death ───
  if (penguin.position.y < -3) triggerDeath();
}

function getStandingPlatform() {
  if (!penguin) return null;
  const px = penguin.position.x;
  const py = penguin.position.y;
  const pz = penguin.position.z;
  for (const plat of gameObjects.platforms) {
    const pd = plat.userData;
    if (px > pd.minX - 0.4 && px < pd.maxX + 0.4 &&
        pz > pd.minZ - 0.4 && pz < pd.maxZ + 0.4 &&
        Math.abs(py - (pd.top + 0.5)) < 0.5) {
      return plat;
    }
  }
  return null;
}

// ─── Camera follow ───
const camOffset = new THREE.Vector3(0, 8, 14);
const camTarget = new THREE.Vector3();

function updateCamera() {
  if (!penguin) return;
  const targetPos = new THREE.Vector3(
    penguin.position.x + camOffset.x,
    penguin.position.y + camOffset.y,
    penguin.position.z + camOffset.z
  );
  camera.position.lerp(targetPos, 0.06);
  camTarget.lerp(
    new THREE.Vector3(penguin.position.x, penguin.position.y + 1.5, penguin.position.z),
    0.08
  );
  camera.lookAt(camTarget);
}
