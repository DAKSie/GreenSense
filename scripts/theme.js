// theme.js - toggles data-theme on <html>, persists choice, respects prefers-color-scheme
(function(){
  const KEY = 'theme'; // 'light' | 'dark'
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function setToggleState(isDark){
    if(!btn) return;
    btn.setAttribute('aria-pressed', String(Boolean(isDark)));
    // simple icon swap: moon for dark, sun for light
    btn.textContent = isDark ? '🌙' : '☀️';
  }

  function applyTheme(theme){
    // Persist an explicit data-theme value so a saved 'light' preference
    // is not overridden by the prefers-color-scheme media rule.
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      setToggleState(true);
    } else {
      root.setAttribute('data-theme','light');
      setToggleState(false);
    }
  }

  function getPreferred(){
    let saved = null;
    try{
      saved = localStorage.getItem(KEY);
    }catch(e){
      // localStorage unavailable (file://, private mode, etc.)
      saved = null;
    }
    if(saved === 'light' || saved === 'dark') return saved;
    try{
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }catch(e){}
    return 'light';
  }

  // init
  const initTheme = getPreferred();
  applyTheme(initTheme);

  // toggle handler
  if(btn){
    btn.addEventListener('click', function(){
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try{ localStorage.setItem(KEY, next); }catch(e){}
    });
    // allow keyboard toggle via Space/Enter
    btn.addEventListener('keydown', function(e){
      if(e.key === ' ' || e.key === 'Enter'){
        e.preventDefault();
        btn.click();
      }
    });
  }
})();
