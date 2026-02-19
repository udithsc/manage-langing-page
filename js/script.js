const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');

if (btn && nav) {
  const body = document.body;

  const toggleMenu = () => {
    btn.classList.toggle('open');
    nav.classList.toggle('flex');
    nav.classList.toggle('hidden');
    body.classList.toggle('overflow-hidden');
  };

  btn.addEventListener('click', toggleMenu);

  // Close when clicking the dark backdrop (outside the panel)
  nav.addEventListener('click', (event) => {
    if (event.target === nav && !nav.classList.contains('hidden')) {
      toggleMenu();
    }
  });

  // Close menu when a mobile nav link is clicked
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!nav.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });
}

// Dynamic copyright year
const copyrightYearElements = document.querySelectorAll('#copyright-year, #copyright-year-desktop');
if (copyrightYearElements.length > 0) {
  const currentYear = new Date().getFullYear();
  copyrightYearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIconLight = document.getElementById('theme-icon-light');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLightMobile = document.getElementById('theme-icon-light-mobile');
const themeIconDarkMobile = document.getElementById('theme-icon-dark-mobile');
const navLogo = document.getElementById('nav-logo');

// Check for saved theme preference or default to light mode
const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || 'light';
};

const setTheme = (theme) => {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
    if (themeIconLight) themeIconLight.classList.add('hidden');
    if (themeIconDark) themeIconDark.classList.remove('hidden');
    if (themeIconLightMobile) themeIconLightMobile.classList.add('hidden');
    if (themeIconDarkMobile) themeIconDarkMobile.classList.remove('hidden');
    if (navLogo) navLogo.src = 'images/logo-white.svg';
  } else {
    html.classList.remove('dark');
    if (themeIconLight) themeIconLight.classList.remove('hidden');
    if (themeIconDark) themeIconDark.classList.add('hidden');
    if (themeIconLightMobile) themeIconLightMobile.classList.remove('hidden');
    if (themeIconDarkMobile) themeIconDarkMobile.classList.add('hidden');
    if (navLogo) navLogo.src = 'images/logo.svg';
  }
  localStorage.setItem('theme', theme);
};

// Initialize theme on page load
setTheme(getTheme());

// Toggle theme on button click
const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}
