// ================== SLIDE NAVIGATION ==================
let currentSlide = 0;
const totalSlides = 6;
const container = document.getElementById('slidesContainer');
const dots = document.querySelectorAll('.dot');

function goToSlide(idx) {
  if (idx < 0 || idx >= totalSlides) return;
  currentSlide = idx;
  container.style.transform = `translateX(-${idx * 100}vw)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  if (idx === 5) setTimeout(spawnFinaleConfetti, 300);
  if (idx === 2) startBatTyping();
}

// ================== CANDLE BLOWING ==================
let candlesLeft = 5;
const blownCandles = [false, false, false, false, false];

function blowCandle(idx) {
  if (blownCandles[idx]) return;
  blownCandles[idx] = true;
  candlesLeft--;

  const flame = document.getElementById('flame-' + idx);
  flame.style.transition = 'transform 0.3s ease, opacity 0.4s ease';
  flame.style.transform = 'scaleY(0)';
  flame.style.opacity = '0';
  setTimeout(() => { flame.style.display = 'none'; }, 400);

  const txt = document.getElementById('candlesLeftText');
  const wishSent = document.getElementById('wishSent');
  const seeNextBtn = document.getElementById('seeNextBtn');

  if (candlesLeft > 0) {
    txt.textContent = candlesLeft + ' candle' + (candlesLeft > 1 ? 's' : '') + ' left to blow out';
  } else {
    txt.style.display = 'none';
    wishSent.style.display = 'block';
    wishSent.style.animation = 'fadeIn 0.6s ease forwards';
    seeNextBtn.style.display = 'flex';
    seeNextBtn.style.animation = 'fadeIn 0.8s ease 0.2s forwards';
    spawnConfetti(document.getElementById('confettiBg1'), 30);
    document.getElementById('confettiBg1').style.opacity = '1';
  }
}

// ================== CONFETTI ==================
function spawnConfetti(container, count) {
  const colors = ['#e03a3a', '#f5c842', '#5ab0f5', '#9b59b6', '#2db8a0', '#f5a623'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 80 + '%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = Math.random() * 2 + 's';
    el.style.animationDuration = (2 + Math.random() * 2) + 's';
    el.style.width = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    if (Math.random() > 0.5) el.style.borderRadius = '50%';
    container.appendChild(el);
  }
}

// Initial Confetti
spawnConfetti(document.getElementById('confettiBg0'), 25);
spawnConfetti(document.getElementById('confettiBg2'), 20);

// ================== BAT TYPING ANIMATION ==================
const batMessages = ['Playing with heart...', 'Champion moves...', 'Boundary king at it again...', '100 not out!'];
let batIdx = 0;
let batTyping = false;

function startBatTyping() {
  if (batTyping) return;
  batTyping = true;
  typeNextBat();
}

function typeNextBat() {
  const el = document.getElementById('batText');
  const msg = '🏏 ' + batMessages[batIdx % batMessages.length];
  batIdx++;
  let i = 0;
  el.textContent = '';
  const iv = setInterval(() => {
    if (i < msg.length) { el.textContent += msg[i++]; }
    else {
      clearInterval(iv);
      setTimeout(typeNextBat, 1800);
    }
  }, 60);
}

// ================== FINALE CONFETTI ==================
let finaleConfettiSpawned = false;
function spawnFinaleConfetti() {
  if (finaleConfettiSpawned) return;
  finaleConfettiSpawned = true;
  const c = document.getElementById('finaleConfetti');
  const colors = ['#e03a3a', '#f5c842', '#5ab0f5', '#9b59b6', '#2db8a0', '#f5a623', '#ff6eb4', '#4caf9a'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = 8 + Math.random() * 10;
    const br = Math.random() > 0.5 ? 2 : 50;
    el.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:${br}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      top:${-10 - Math.random() * 20}%;
      animation: confettiRain ${2.5 + Math.random() * 2.5}s linear ${Math.random() * 2}s infinite;
      opacity:0.85;
    `;
    c.appendChild(el);
  }
  if (!document.getElementById('confettiRainStyle')) {
    const st = document.createElement('style');
    st.id = 'confettiRainStyle';
    st.textContent = `@keyframes confettiRain { 0% { transform: translateY(-5vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(105vh) rotate(720deg); opacity: 0.6; } }`;
    document.head.appendChild(st);
  }
}

// ================== MUSIC ==================
let musicPlaying = false;

function updateMusicIcon() {
  document.getElementById('iconPlaying').style.display = musicPlaying ? '' : 'none';
  document.getElementById('iconMuted').style.display = musicPlaying ? 'none' : '';
}

function hideTapToPlay() {
  const t = document.getElementById('tapToPlay');
  if (t) t.classList.add('hidden');
}

window.addEventListener('load', () => {
  const audio = document.getElementById('bgMusic');
  audio.volume = 0.7;
  audio.muted = false;
  musicPlaying = true;
  updateMusicIcon();
  hideTapToPlay();
});

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
  } else {
    audio.muted = false;
    audio.play();
    musicPlaying = true;
  }
  updateMusicIcon();
  hideTapToPlay();
}
