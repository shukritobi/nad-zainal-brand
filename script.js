const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const form = document.getElementById('briefForm');
const toast = document.getElementById('toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    'Hi Nad Zainal management, I would like to submit a collaboration brief.',
    '',
    `Brand: ${data.get('brand')}`,
    `Contact: ${data.get('contact')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone')}`,
    `Collaboration: ${data.get('type')}`,
    `Budget: ${data.get('budget')}`,
    `Preferred date: ${data.get('date') || 'To be discussed'}`,
    `Product sample available: ${data.get('sample') ? 'Yes' : 'No / to be discussed'}`,
    '',
    `Brief: ${data.get('brief')}`
  ].join('\n');
  const url = `https://wa.me/601125050216?text=${encodeURIComponent(message)}`;
  showToast('Opening the prepared WhatsApp brief…');
  setTimeout(() => window.open(url, '_blank', 'noopener'), 450);
});
