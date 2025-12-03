// ui.js - small interactions (signup form, simple feedback)
(function(){
  // Signup form feedback
  const form = document.getElementById('signup-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = form.querySelector('#email').value;
      const parent = form.parentElement;
      const msg = document.createElement('div');
      msg.className = 'signup-success';
      msg.textContent = 'Thanks, we\'ll email you a quick demo at ' + (email || 'your address');
      parent.replaceChild(msg, form);
    });
  }

  // Reveal on load / scroll (IntersectionObserver)
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealOnLoad(){
    // hero elements: headline, lede, actions, visual
    const heroTargets = document.querySelectorAll('.hero-copy, .hero-visual');
    heroTargets.forEach((el, i) => {
      if(prefersReduced) { el.classList.add('show'); return; }
      el.classList.add('reveal');
      // set stagger by CSS variable
      el.style.setProperty('--delay', (i * 60) + 'ms');
      requestAnimationFrame(()=> setTimeout(()=> el.classList.add('show'), 60 + i * 80));
    });
  }

  function observeReveals(){
    if(prefersReduced) return; // no scroll animations for reduced motion
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          if(el.classList.contains('reveal-stagger')){
            el.classList.add('show');
          } else {
            el.classList.add('show');
          }
          obs.unobserve(el);
        }
      });
    },{threshold:0.12});

    // pick elements to animate on scroll
    const scrollTargets = document.querySelectorAll('.features-grid, .how .steps, .testimonial, .pre-footer-cta');
    scrollTargets.forEach(el => {
      // add base class if not present
      if(!el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')){
        // features-grid and steps should stagger
        if(el.classList.contains('features-grid') || el.classList.contains('steps')){
          el.classList.add('reveal-stagger');
        } else {
          el.classList.add('reveal');
        }
      }
      io.observe(el);
    });
  }

  // run on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { revealOnLoad(); observeReveals(); });
  } else {
    revealOnLoad(); observeReveals();
  }

})();
