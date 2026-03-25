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



function initMobileControls() {
  const container = document.getElementById('mobile-controls');
  
  if (!container) return;
  
  // Показываем кнопки только на мобильных устройствах
  //const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobile = true; // всегда показывать
  if (isMobile) {
    container.classList.add('active');
  }
  
  const buttons = container.querySelectorAll('.ctrl-btn');
  buttons.forEach(btn => {
    const keyCode = btn.getAttribute('data-key');
    if (!keyCode) return;
    
    // Обработка касаний
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keys[keyCode] = true;
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keys[keyCode] = false;
    });
    btn.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      keys[keyCode] = false;
    });
    
    // Для отладки на десктопе (можно удалить)
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      keys[keyCode] = true;
    });
    btn.addEventListener('mouseup', (e) => {
      e.preventDefault();
      keys[keyCode] = false;
    });
    btn.addEventListener('mouseleave', (e) => {
      keys[keyCode] = false;
    });
  });
}
