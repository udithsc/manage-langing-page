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
    if (navLogo) navLogo.src = 'images/udt-logo-white.svg';
  } else {
    html.classList.remove('dark');
    if (themeIconLight) themeIconLight.classList.remove('hidden');
    if (themeIconDark) themeIconDark.classList.add('hidden');
    if (themeIconLightMobile) themeIconLightMobile.classList.remove('hidden');
    if (themeIconDarkMobile) themeIconDarkMobile.classList.add('hidden');
    if (navLogo) navLogo.src = 'images/udt-logo.svg';
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

// Custom Video Presentation Modal Logic
const seeHowItWorksBtn = document.getElementById('see-how-it-works-btn');
const videoModal = document.getElementById('video-modal');
const videoModalContent = document.getElementById('video-modal-content');
const closeVideoModal = document.getElementById('close-video-modal');
const videoStartOverlay = document.getElementById('video-start-overlay');
const presentationScenesContainer = document.getElementById('presentation-scenes');
const scene1 = document.querySelector('.scene-1');
const scene2 = document.querySelector('.scene-2');
const scene3 = document.querySelector('.scene-3');
const scene4 = document.querySelector('.scene-4');
const videoProgress = document.getElementById('video-progress');
const videoCloseCta = document.getElementById('video-close-cta');

function openModal() {
  if (!videoModal) return;

  // Disable body scroll
  document.body.classList.add('overflow-hidden');

  videoModal.classList.remove('opacity-0', 'pointer-events-none');
  videoModalContent.classList.remove('scale-95');
  videoModalContent.classList.add('scale-100');

  // Reset video state
  videoStartOverlay.classList.remove('opacity-0', 'pointer-events-none');
  presentationScenesContainer.classList.add('hidden');

  // Remove animation classes so they can be re-triggered
  scene1.classList.remove('run-scene-1');
  scene2.classList.remove('run-scene-2');
  scene3.classList.remove('run-scene-3');
  scene4.classList.remove('run-scene-4');
  videoProgress.classList.remove('run-video-progress');
}

function closeModal() {
  if (!videoModal) return;

  // Re-enable body scroll
  document.body.classList.remove('overflow-hidden');

  videoModal.classList.add('opacity-0', 'pointer-events-none');
  videoModalContent.classList.remove('scale-100');
  videoModalContent.classList.add('scale-95');

  // Clean up classes after transition
  setTimeout(() => {
    scene1.classList.remove('run-scene-1');
    scene2.classList.remove('run-scene-2');
    scene3.classList.remove('run-scene-3');
    scene4.classList.remove('run-scene-4');
    videoProgress.classList.remove('run-video-progress');
  }, 500);
}

function startVideo() {
  if (!videoStartOverlay) return;
  videoStartOverlay.classList.add('opacity-0', 'pointer-events-none');
  presentationScenesContainer.classList.remove('hidden');

  // Trigger DOM reflow so animations play from start
  void presentationScenesContainer.offsetWidth;

  scene1.classList.add('run-scene-1');
  scene2.classList.add('run-scene-2');
  scene3.classList.add('run-scene-3');
  scene4.classList.add('run-scene-4');
  videoProgress.classList.add('run-video-progress');
}

if (seeHowItWorksBtn && videoModal) {
  seeHowItWorksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeVideoModal) closeVideoModal.addEventListener('click', closeModal);
  if (videoStartOverlay) videoStartOverlay.addEventListener('click', startVideo);

  // Close on backdrop click (clicking outside the modal container)
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });

  // Close CTA inside video (Start Your Project Today)
  if (videoCloseCta) {
    videoCloseCta.addEventListener('click', () => {
      closeModal();
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
