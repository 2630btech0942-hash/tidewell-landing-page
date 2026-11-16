// Mobile menu
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  }
});

// Interactive bottle demo
const GOAL = 2000, SIP = 250, TOP = 50, FULL = 235;
let ml = 0;
const fill = document.getElementById('fill');
const mlText = document.getElementById('ml');
const status = document.getElementById('status');
const sipBtn = document.getElementById('sipBtn');

function render() {
  const h = Math.round(FULL * ml / GOAL);
  fill.setAttribute('y', TOP + FULL - h);
  fill.setAttribute('height', h);
  mlText.textContent = ml.toLocaleString();
  if (ml === 0) status.textContent = 'Tap below to log your first sip.';
  else if (ml < GOAL) status.textContent = (GOAL - ml).toLocaleString() + ' ml to go. Keep it up!';
  else { status.textContent = 'Goal reached. Nice work today.'; sipBtn.textContent = 'Reset'; }
}

sipBtn.addEventListener('click', () => {
  if (ml >= GOAL) { ml = 0; sipBtn.textContent = 'Log a sip (250 ml)'; }
  else ml = Math.min(GOAL, ml + SIP);
  render();
});

document.querySelectorAll('.swatch').forEach(s => {
  s.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(o => o.setAttribute('aria-pressed', 'false'));
    s.setAttribute('aria-pressed', 'true');
    fill.setAttribute('fill', s.dataset.color);
  });
});
render();

// Waitlist form validation
const form = document.getElementById('form');
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  msg.className = 'msg ' + (valid ? 'ok' : 'error');
  msg.textContent = valid
    ? 'You’re on the list. We’ll email you at launch.'
    : 'Enter a valid email address, like name@example.com.';
  if (valid) form.reset();
});
