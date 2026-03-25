// ═══════════════════════════════════════════════════════
//   MATERIALS — all shared Three.js materials
// ═══════════════════════════════════════════════════════

const MAT = {
  ice:          new THREE.MeshLambertMaterial({ color: 0xa8d8f0 }),
  iceShiny:     new THREE.MeshPhongMaterial({ color: 0xc8ecff, shininess: 120, specular: 0xffffff }),
  snow:         new THREE.MeshLambertMaterial({ color: 0xf0f8ff }),
  rock:         new THREE.MeshLambertMaterial({ color: 0x6b8fa3 }),
  fish:         new THREE.MeshPhongMaterial({ color: 0xf4a460, shininess: 80, emissive: 0x331100 }),
  fishGlow:     new THREE.MeshPhongMaterial({ color: 0xff8c00, emissive: 0xff4400, emissiveIntensity: 0.4, shininess: 100 }),
  penguinBody:  new THREE.MeshLambertMaterial({ color: 0x1a1a2e }),
  penguinBelly: new THREE.MeshLambertMaterial({ color: 0xf5f5f0 }),
  penguinBeak:  new THREE.MeshLambertMaterial({ color: 0xff8c00 }),
  penguinFeet:  new THREE.MeshLambertMaterial({ color: 0xff6600 }),
  penguinEye:   new THREE.MeshLambertMaterial({ color: 0xffffff }),
  penguinPupil: new THREE.MeshLambertMaterial({ color: 0x111111 }),
  flagPole:     new THREE.MeshLambertMaterial({ color: 0xcccccc }),
  flagCloth:    new THREE.MeshLambertMaterial({ color: 0xff3333 }),
  sky:          new THREE.MeshLambertMaterial({ color: 0x87ceeb, side: THREE.BackSide }),
  water:        new THREE.MeshPhongMaterial({ color: 0x006994, transparent: true, opacity: 0.85, shininess: 200 }),
};
