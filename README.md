# GreenSense Minimal Landing

This workspace is a minimal, accessible landing page scaffold for the GreenSense project.

Files added:
- `index.html` - semantic markup (header, main, footer) and accessible attributes
- `styles/` - `base.css`, `layout.css`, `components.css` (mobile-first, variables)
- `scripts/` - `theme.js`, `ui.js` (theme toggle + small interactions)
- `assets/` - `logo.svg`, `hero.svg` (replace hero with optimized WebP for production)

Run locally:
- Open `index.html` in your browser (file://) or serve with a tiny static server:

  powershell:

  python -m http.server 8000; Start-Process http://localhost:8000

Notes for production:
- Replace `assets/hero.svg` with an optimized WebP and provide `srcset` if you like.
- Minify CSS/JS for production. Inline critical CSS for faster first paint.
- Deploy to GitHub Pages, Netlify, or Vercel for quick hosting.

Theme behavior:
- `scripts/theme.js` toggles the `data-theme="dark"` attribute on `<html>`.
- Preference is saved to `localStorage` under key `theme` and falls back to `prefers-color-scheme`.

Accessibility & testing checklist:
- Keyboard: tab through nav, buttons and toggle
- Theme: toggle and persist after reload
- Responsiveness: test at 320/420/768/1024 widths
- Contrast: verify CTA and body text in both themes

Replace assets and refine copy as next steps.
