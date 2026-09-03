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
