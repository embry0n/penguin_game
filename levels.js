// ═══════════════════════════════════════════════════════
//   LEVELS — all level data definitions
// ═══════════════════════════════════════════════════════

const LEVELS = [
  // ── Level 1 — The Frozen Shore ──
  {
    name: 'Ледяной Берег',
    skyColor: 0x87ceeb,
    fogColor: 0x87ceeb,
    spawn: { x: 0, y: 3, z: 0 },
    platforms: [
      { x: 0,   y: 1,   z: 0,   w: 8, h: 1, d: 8,  mat: 'iceShiny' },
      { x: 9,   y: 1.5, z: 0,   w: 5, h: 1, d: 4,  mat: 'iceShiny', slip: true },
      { x: 15,  y: 2.5, z: 0,   w: 4, h: 1, d: 4,  mat: 'iceShiny' },
      { x: 21,  y: 3.5, z: 0,   w: 4, h: 1, d: 4,  mat: 'iceShiny' },
      { x: 21,  y: 3.5, z: -6,  w: 4, h: 1, d: 4,  mat: 'iceShiny' },
      { x: 15,  y: 4.5, z: -10, w: 5, h: 1, d: 5,  mat: 'snow' },
      { x: 7,   y: 5.5, z: -12, w: 4, h: 1, d: 4,  mat: 'iceShiny' },
      { x: 0,   y: 6.5, z: -12, w: 5, h: 1, d: 5,  mat: 'iceShiny', slip: true },
      { x: -6,  y: 7,   z: -8,  w: 4, h: 1, d: 4,  mat: 'iceShiny' },
      { x: -10, y: 8,   z: -2,  w: 6, h: 1, d: 6,  mat: 'snow' },
    ],
    fishes: [
      { x: 9,   y: 3.5, z: 0   },
      { x: 15,  y: 4.5, z: 0   },
      { x: 21,  y: 5.5, z: -6  },
      { x: 7,   y: 7.5, z: -12 },
      { x: -6,  y: 9,   z: -8  },
      { x: -10, y: 10,  z: -2  },
    ],
  },

  // ── Level 2 — Ice Spires ──
  {
    name: 'Ледяные Шпили',
    skyColor: 0x6fa3c9,
    fogColor: 0x6fa3c9,
    spawn: { x: 0, y: 3, z: 0 },
    platforms: [
      { x: 0,   y: 1,    z: 0,  w: 6, h: 1, d: 6,  mat: 'iceShiny' },
      { x: 7,   y: 2,    z: 2,  w: 3, h: 1, d: 3,  mat: 'iceShiny', slip: true },
      { x: 12,  y: 3,    z: 5,  w: 3, h: 1, d: 3,  mat: 'iceShiny' },
      { x: 8,   y: 4.5,  z: 10, w: 3, h: 1, d: 3,  mat: 'iceShiny', slip: true },
      { x: 2,   y: 6,    z: 14, w: 3, h: 1, d: 3,  mat: 'iceShiny' },
      { x: -4,  y: 7.5,  z: 10, w: 3, h: 1, d: 3,  mat: 'iceShiny', slip: true },
      { x: -8,  y: 9,    z: 5,  w: 3, h: 1, d: 3,  mat: 'iceShiny' },
      { x: -12, y: 10.5, z: 1,  w: 3, h: 1, d: 3,  mat: 'iceShiny', slip: true },
      { x: -8,  y: 12,   z: -4, w: 3, h: 1, d: 3,  mat: 'iceShiny' },
      { x: -2,  y: 13.5, z: -8, w: 5, h: 1, d: 5,  mat: 'snow' },
    ],
    fishes: [
      { x: 7,   y: 3.5,  z: 2  },
      { x: 12,  y: 4.5,  z: 5  },
      { x: 2,   y: 7.5,  z: 14 },
      { x: -8,  y: 10.5, z: 5  },
      { x: -12, y: 12,   z: 1  },
      { x: -2,  y: 15,   z: -8 },
      { x: 8,   y: 6,    z: 10 },
    ],
  },

  // ── Level 3 — Glacier Summit ──
  {
    name: 'Вершина Ледника',
    skyColor: 0x4a7fb5,
    fogColor: 0x4a7fb5,
    spawn: { x: 0, y: 3, z: 0 },
    platforms: [
      { x: 0,  y: 1,  z: 0,   w: 5,   h: 1, d: 5,   mat: 'iceShiny' },
      { x: 6,  y: 2,  z: 0,   w: 2.5, h: 1, d: 2.5, mat: 'iceShiny', slip: true },
      { x: 10, y: 4,  z: 0,   w: 2.5, h: 1, d: 2.5, mat: 'iceShiny' },
      { x: 10, y: 6,  z: -5,  w: 2.5, h: 1, d: 2.5, mat: 'iceShiny', slip: true },
      { x: 6,  y: 8,  z: -9,  w: 2.5, h: 1, d: 2.5, mat: 'iceShiny' },
      { x: 0,  y: 10, z: -12, w: 2.5, h: 1, d: 2.5, mat: 'iceShiny', slip: true },
      { x: -5, y: 12, z: -10, w: 2.5, h: 1, d: 2.5, mat: 'iceShiny' },
      { x: -8, y: 14, z: -5,  w: 2.5, h: 1, d: 2.5, mat: 'iceShiny', slip: true },
      { x: -8, y: 16, z: 0,   w: 2.5, h: 1, d: 2.5, mat: 'iceShiny' },
      { x: -5, y: 18, z: 5,   w: 2.5, h: 1, d: 2.5, mat: 'iceShiny', slip: true },
      { x: 0,  y: 20, z: 8,   w: 5,   h: 1, d: 5,   mat: 'snow' },
    ],
    fishes: [
      { x: 6,  y: 3.5,  z: 0   },
      { x: 10, y: 5.5,  z: 0   },
      { x: 10, y: 7.5,  z: -5  },
      { x: 0,  y: 11.5, z: -12 },
      { x: -8, y: 15.5, z: -5  },
      { x: -5, y: 19.5, z: 5   },
      { x: 0,  y: 21.5, z: 8   },
      { x: 6,  y: 9.5,  z: -9  },
    ],
  },
];
