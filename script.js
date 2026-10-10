const team = [
  { name: "Jery Rodríguez", role: "Analista de Datos · Matemático · Diseñador Gráfico", initials: "JR", color: "#8b5cf6", bio: "Con Jery puedes contar para transforma tus datos en poder de decisión, así como crear un diseño web que atraiga clientes y refuerce tu marca.", skills: ["Estadísticas", "Modelación de Datos"], whatsapp: "https://wa.me/5355210171", telegram: "https://t.me/JeryRf03" },
  { name: "Josué J. Senarega", role: "Marketing · Especialista en IA · Arquitecto de Sistemas", initials: "JS", color: "#14b8a6", bio: "Josué te puede ayudar a construir una web robusta desde sus cimientos, autónoma y potenciada por inteligencia artificial, lista para crecer contigo.", skills: ["IA", "Marketing Digital", "Sistemas Escalables"], whatsapp: "https://wa.me/5356473645", telegram: "https://t.me/JosuJSC" },
];

const teamGrid = document.getElementById('teamGrid');
team.forEach((member, index) => {
  const card = document.createElement('article');
  card.className = 'team-card reveal';
  card.style.setProperty('--member-color', member.color);
  card.innerHTML = `
    <div class="team-card-top">
      <div class="team-avatar" style="background: ${member.color}">${member.initials}</div>
      <div class="team-socials">
        <a href="${member.whatsapp}" target="_blank" rel="noreferrer" aria-label="WhatsApp de ${member.name}">WhatsApp</a>
        <a href="${member.telegram}" target="_blank" rel="noreferrer" aria-label="Telegram de ${member.name}">Telegram</a>
      </div>
    </div>
    <h3 class="team-name">${member.name}</h3>
    <p class="team-role">${member.role}</p>
    <p class="team-bio">${member.bio}</p>
    <div class="team-skills">${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</div>
  `;
  card.style.transitionDelay = `${index * 0.06}s`;
  teamGrid.appendChild(card);
});

// ===== Animaciones al hacer scroll =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// ===== Menú móvil =====
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.menu-link');
const siteHeader = document.getElementById('siteHeader');
const heroStats = document.querySelector('.hero-stats');
const mobileHeaderBreakpoint = window.matchMedia('(max-width: 799px)');

function updateMobileHeaderVisibility() {
  const showHeader = mobileHeaderBreakpoint.matches && heroStats.getBoundingClientRect().bottom <= 0;
  siteHeader.classList.toggle('mobile-visible', showHeader);
  siteHeader.inert = mobileHeaderBreakpoint.matches && !showHeader;
}

window.addEventListener('scroll', updateMobileHeaderVisibility, { passive: true });
window.addEventListener('resize', updateMobileHeaderVisibility);
mobileHeaderBreakpoint.addEventListener('change', updateMobileHeaderVisibility);
updateMobileHeaderVisibility();

function toggleMenu(force) {
  const isOpen = force !== undefined ? force : !sideMenu.classList.contains('open');
  sideMenu.classList.toggle('open', isOpen);
  menuBtn.classList.toggle('active', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  overlay.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => toggleMenu());
overlay.addEventListener('click', () => toggleMenu(false));
menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// ===== Contadores =====
const counters = document.querySelectorAll('.stat strong');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.target);
    const duration = 1300;
    const start = performance.now();
    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.6 });
counters.forEach(counter => counterObserver.observe(counter));

// ===== Formulario =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const idea = document.getElementById('message').value.trim();
  const phone = '5355210171';
  const message = `Hola que tal Jery, me llamo ${name}, tengo un idea que quiero compartir contigo: ${idea}`;
  window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
});