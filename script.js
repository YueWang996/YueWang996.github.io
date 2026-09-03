const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
    navigation.classList.toggle('is-open', shouldOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// Respect prefers-reduced-motion: pause the looping comparison clip and expose controls.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const loopingVideos = Array.from(document.querySelectorAll('video[autoplay]'));

const applyMotionPreference = () => {
  loopingVideos.forEach((video) => {
    if (reduceMotion.matches) {
      video.autoplay = false;
      video.loop = false;
      video.controls = true;
      video.pause();
    } else {
      video.loop = true;
      video.controls = false;
      video.play().catch(() => { video.controls = true; });
    }
  });
};

if (loopingVideos.length) {
  applyMotionPreference();
  reduceMotion.addEventListener('change', applyMotionPreference);
}

// Theme toggle. The head script already resolved the initial theme; this only
// handles clicks and, while the visitor has not chosen one, follows the system.
const themeToggle = document.querySelector('.theme-toggle');
const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch (error) {
    return null;
  }
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1c23' : '#f5f4ef');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
  }
};

applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (error) {
      /* storage blocked; the choice just will not persist */
    }
  });
}

themeQuery.addEventListener('change', (event) => {
  if (!readStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
});
