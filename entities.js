// ═══════════════════════════════════════════════════════
//   ENTITIES — factory functions for all 3D objects
// ═══════════════════════════════════════════════════════

// ─── Lighting ───
function setupLighting() {
  scene.children.filter(c => c.isLight).forEach(l => scene.remove(l));

  const ambient = new THREE.AmbientLight(0xadd8e6, 0.6);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff5e4, 1.2);
  sun.position.set(20, 40, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near   = 0.5;
  sun.shadow.camera.far    = 200;
  sun.shadow.camera.left   = -60;
  sun.shadow.camera.right  =  60;
  sun.shadow.camera.top    =  60;
  sun.shadow.camera.bottom = -60;
  sun.shadow.bias = -0.001;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xc9e8ff, 0.3);
  fill.position.set(-10, 5, -10);
  scene.add(fill);
}

// ─── Penguin ───
function createPenguin() {
  const group = new THREE.Group();

  // Body
  const bodyGeo = new THREE.SphereGeometry(0.5, 12, 10);
  bodyGeo.scale(1, 1.3, 0.85);
  const body = new THREE.Mesh(bodyGeo, MAT.penguinBody);
  body.position.y = 0.65;
  body.castShadow = true;
  group.add(body);

  // Belly patch
  const bellyGeo = new THREE.SphereGeometry(0.32, 10, 8);
  bellyGeo.scale(1, 1.1, 0.5);
  const belly = new THREE.Mesh(bellyGeo, MAT.penguinBelly);
  belly.position.set(0, 0.65, 0.38);
  group.add(belly);

  // Head
  const headGeo = new THREE.SphereGeometry(0.32, 10, 9);
  const head = new THREE.Mesh(headGeo, MAT.penguinBody);
  head.position.y = 1.35;
  head.castShadow = true;
  group.add(head);

  // White face patch
  const faceGeo = new THREE.SphereGeometry(0.22, 8, 7);
  faceGeo.scale(1, 0.9, 0.6);
  const face = new THREE.Mesh(faceGeo, MAT.penguinBelly);
  face.position.set(0, 1.33, 0.22);
  group.add(face);

  // Eyes
  [-0.1, 0.1].forEach(x => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), MAT.penguinEye);
    eye.position.set(x, 1.42, 0.28);
    group.add(eye);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 5, 5), MAT.penguinPupil);
    pupil.position.set(x * 0.9, 1.42, 0.315);
    group.add(pupil);
  });

  // Beak
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 5), MAT.penguinBeak);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 1.32, 0.42);
  group.add(beak);

  // Wings (flippers)
  [-1, 1].forEach(side => {
    const wingGeo = new THREE.SphereGeometry(0.18, 6, 4);
    wingGeo.scale(0.4, 1.4, 0.6);
    const wing = new THREE.Mesh(wingGeo, MAT.penguinBody);
    wing.position.set(side * 0.52, 0.72, 0);
    wing.rotation.z = side * 0.3;
    wing.castShadow = true;
    group.add(wing);
  });

  // Feet
  [-1, 1].forEach(side => {
    const footGeo = new THREE.SphereGeometry(0.14, 6, 4);
    footGeo.scale(1.6, 0.4, 1.2);
    const foot = new THREE.Mesh(footGeo, MAT.penguinFeet);
    foot.position.set(side * 0.18, 0.12, 0.08);
    group.add(foot);
  });

  // Black circle shadow
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4, depthWrite: false });
  const blobShadow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), shadowMat);
  blobShadow.rotation.x = -Math.PI / 2;
  blobShadow.position.set(0, 0, 0);
  blobShadow.renderOrder = 1;
  group.add(blobShadow);

  group.userData = {
    vx: 0, vy: 0, vz: 0,
    onGround: false,
    isSliding: false,
    slideTime: 0,
    slideDir: { x: 0, z: 0 },
    wobbleTime: 0,
    dead: false,
    facingAngle: 0,
    blobShadow,
  };

  return group;
}

// ─── Platform ───
function makePlatform(x, y, z, w, h, d, matKey = 'iceShiny', isSlippery = false) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), MAT[matKey]);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.userData = {
    type: 'platform',
    top: y + h / 2,
    minX: x - w / 2, maxX: x + w / 2,
    minZ: z - d / 2, maxZ: z + d / 2,
    isSlippery,
  };

  if (matKey === 'iceShiny') {
    const snow = new THREE.Mesh(new THREE.BoxGeometry(w + 0.05, 0.12, d + 0.05), MAT.snow);
    snow.position.set(0, h / 2 + 0.06, 0);
    mesh.add(snow);
  }

  return mesh;
}

// ─── Fish ───
// function createFish(x, y, z) {
//   const group = new THREE.Group();

//   const bodyGeo = new THREE.SphereGeometry(0.22, 8, 6);
//   bodyGeo.scale(1.8, 1, 0.7);
//   group.add(new THREE.Mesh(bodyGeo, MAT.fishGlow));

//   const tail = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.28, 4), MAT.fish);
//   tail.rotation.z = Math.PI / 2;
//   tail.position.x = -0.35;
//   group.add(tail);

//   const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 5), MAT.penguinPupil);
//   eye.position.set(0.22, 0.08, 0.15);
//   group.add(eye);

//   group.add(new THREE.PointLight(0xff8c00, 0.8, 3));

//   group.position.set(x, y, z);
//   group.userData = { collected: false, floatTime: Math.random() * Math.PI * 2, baseY: y };
//   return group;
// }


//govno
// entities.js

let fishModel = null;   // здесь будет храниться загруженная 3D-модель

// Функция загрузки модели (вызывается при старте игры)
function loadFishModel(callback) {
  const loader = new THREE.GLTFLoader();
  loader.load('Fish.glb', (gltf) => {   // путь к вашему файлу
    fishModel = gltf.scene;
    // При необходимости подправьте масштаб и поворот модели
    fishModel.scale.set(0.5, 0.5, 0.5);
    fishModel.rotation.y = Math.PI / 2;
    if (callback) callback();
  }, undefined, (error) => {
    console.error('Ошибка загрузки модели рыбки:', error);
  });
}

// Новая версия createFish, использующая клонирование загруженной модели
function createFish(x, y, z) {
  if (!fishModel) {
    console.warn('Модель рыбки ещё не загружена!');
    return null;
  }

  const group = new THREE.Group();

  // Клонируем модель, чтобы можно было создать несколько экземпляров
  const modelClone = fishModel.clone();
  group.add(modelClone);

  // Сохраняем точечный свет, который давал эффект свечения (опционально)
  const light = new THREE.PointLight(0xff8c00, 0.8, 3);
  group.add(light);

  group.position.set(x, y, z);
  group.userData = {
    collected: false,
    floatTime: Math.random() * Math.PI * 2,
    baseY: y,
    light: light   // если хотите анимировать свет
  };

  return group;
}


// ─── Particles ───
function spawnParticles(x, y, z, count = 8, color = 0xffd700) {
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
  for (let i = 0; i < count; i++) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.07, 4, 4), mat.clone());
    p.position.set(x, y, z);
    const angle = (i / count) * Math.PI * 2;
    p.userData = {
      vx: Math.cos(angle) * 0.08 + (Math.random() - 0.5) * 0.06,
      vy: 0.12 + Math.random() * 0.08,
      vz: Math.sin(angle) * 0.08 + (Math.random() - 0.5) * 0.06,
      life: 1.0,
    };
    scene.add(p);
    gameObjects.particles.push(p);
  }
}

// ─── Snowflakes ───
const snowflakes = [];

function createSnowflakes() {
  const geo = new THREE.SphereGeometry(0.04, 3, 3);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
  for (let i = 0; i < 80; i++) {
    const s = new THREE.Mesh(geo, mat);
    s.position.set(
      (Math.random() - 0.5) * 60,
      Math.random() * 20,
      (Math.random() - 0.5) * 60
    );
    s.userData = { speed: 0.02 + Math.random() * 0.03, drift: (Math.random() - 0.5) * 0.01 };
    scene.add(s);
    snowflakes.push(s);
  }
}

function updateSnowflakes() {
  if (!penguin) return;
  const cx = penguin.position.x;
  const cz = penguin.position.z;
  snowflakes.forEach(s => {
    s.position.y -= s.userData.speed;
    s.position.x += s.userData.drift;
    if (s.position.y < -5) {
      s.position.y = 20;
      s.position.x = cx + (Math.random() - 0.5) * 60;
      s.position.z = cz + (Math.random() - 0.5) * 60;
    }
  });
}

// ─── Level decorations ───
function addFlag(x, y, z) {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.5, 6), MAT.flagPole);
  pole.position.set(x, y + 1.25, z);
  levelGroup.add(pole);

  const flag = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.05), MAT.flagCloth);
  flag.position.set(x + 0.4, y + 2.3, z);
  flag.userData = { isFlag: true };
  levelGroup.add(flag);
  gameObjects.decorations.push(flag);
}

function addIceberg(x, y, z) {
  const h = 3 + Math.random() * 5;
  const mesh = new THREE.Mesh(
    new THREE.ConeGeometry(2 + Math.random() * 2, h, 5 + Math.floor(Math.random() * 3)),
    MAT.iceShiny
  );
  mesh.position.set(x, y + h / 2, z);
  mesh.rotation.y = Math.random() * Math.PI;
  levelGroup.add(mesh);
}




