(function () {
  'use strict';

  const root   = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Honour saved preference, then OS preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved ?? (prefersDark ? 'dark' : 'light');

  applyTheme(initial, false);

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    localStorage.setItem('theme', next);
  });

  // Keep in sync if the OS preference changes and the user hasn't overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyTheme(theme, animate) {
    if (!animate || prefersReducedMotion.matches) {
      // Suppress the CSS transition on first paint (or when motion is reduced)
      root.style.transition = 'none';
    }

    root.dataset.theme = theme;

    const isDark = theme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(isDark));

    if (!animate || prefersReducedMotion.matches) {
      // Force reflow then restore transitions
      void root.offsetHeight;
      root.style.transition = '';
    }
  }
})();

// ── Projects ─────────────────────────────────────────────────
(function () {
  'use strict';

  const projects = [
    {
      title: 'DevToolkit',
      description: 'A collection of browser-based developer utilities — JSON formatter, Base64 encoder, color picker, and more.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://github.com',
    },
    {
      title: 'NoteFlow',
      description: 'Lightweight Markdown note-taking app with local persistence, live preview, and keyboard-first navigation.',
      tags: ['TypeScript', 'IndexedDB'],
      url: 'https://github.com',
    },
    {
      title: 'PaletteGen',
      description: 'Accessible color palette generator that checks WCAG contrast ratios and exports to CSS custom properties.',
      tags: ['React', 'CSS', 'a11y'],
      url: 'https://github.com',
    },
  ];

  function createProjectCard({ title, description, tags, url }) {
    const a = document.createElement('a');
    a.className = 'project-card';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `${title} (opens in new tab)`);

    const h3 = document.createElement('h3');
    h3.className = 'project-card-title';
    h3.textContent = title;

    const p = document.createElement('p');
    p.className = 'project-card-desc';
    p.textContent = description;

    const tagList = document.createElement('div');
    tagList.className = 'project-card-tags';
    tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      tagList.appendChild(span);
    });

    a.appendChild(h3);
    a.appendChild(p);
    a.appendChild(tagList);
    return a;
  }

  const grid = document.getElementById('projects-grid');
  projects.forEach((project) => grid.appendChild(createProjectCard(project)));
})();
