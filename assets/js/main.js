// Google Analytics (gtag.js)
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-KVR8G1CEJL';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-KVR8G1CEJL');
})();

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

document.addEventListener('DOMContentLoaded', function () {
  // --- Navigation scroll behavior (Intersection Observer) ---
  var hero = document.querySelector('.hero');
  var header = document.querySelector('header.top') || document.querySelector('header');

  if (hero && header) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          header.classList.remove('nav-scrolled');
        } else {
          header.classList.add('nav-scrolled');
        }
      });
    }, { threshold: 0 });

    navObserver.observe(hero);
  }

  // --- Viewport fade-in animations (Intersection Observer) ---
  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }
});
