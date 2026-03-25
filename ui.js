// ═══════════════════════════════════════════════════════
//   UI — HUD updates, screen transitions, menus
// ═══════════════════════════════════════════════════════

const LEVEL_ICONS       = ['🏔️', '❄️', '🌨️'];
const LEVEL_DIFFICULTIES = ['Легко', 'Средне', 'Сложно'];

// ─── HUD ───
function updateHUD() {
  document.getElementById('fish-count').textContent  = fishCollected;
  document.getElementById('fish-total').textContent  = fishTotal;
  document.getElementById('level-num').textContent   = currentLevel + 1;
  document.getElementById('lives-count').textContent = lives;
}

// ─── Screen switcher ───
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  if (id) document.getElementById(id).classList.add('active');
}

// ─── Level card builder (shared between main menu and in-game menu) ───
function buildLevelCards(gridId, onSelect) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  LEVELS.forEach((lvl, i) => {
    const card = document.createElement('div');
    card.className = 'level-card';
    card.innerHTML = `
      <span class="lc-icon">${LEVEL_ICONS[i] || '🧊'}</span>
      <div class="lc-num">${i + 1}</div>
      <div class="lc-name">${lvl.name}</div>
      <div class="lc-fish">🐟 ${lvl.fishes.length} рыб · ${LEVEL_DIFFICULTIES[i] || ''}</div>
    `;
    card.addEventListener('click', () => onSelect(i));
    grid.appendChild(card);
  });
}

// ─── Main menu level select ───
function showLevelSelect() {
  buildLevelCards('level-grid', i => startFromLevel(i));
  showScreen('level-select');
}

// ─── In-game pause menu ───
function openInGameMenu() {
  gameState = 'paused';
  buildLevelCards('ingame-level-grid', i => {
    currentLevel = i;
    lives = 3;
    loadLevel(i);
    closeInGameMenu();
  });
  document.getElementById('ingame-menu').classList.add('active');
}

function closeInGameMenu() {
  document.getElementById('ingame-menu').classList.remove('active');
  gameState = 'playing';
}
