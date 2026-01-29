// Theme management utility

const THEME_KEY = 'api-playground-theme';

export const THEMES = {
  light: {
    name: 'Light',
    colors: {
      bg: '#f9fafb',
      panel: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      primary: '#3b82f6',
      primaryHover: '#2563eb'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      bg: '#0f172a',
      panel: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      primary: '#60a5fa',
      primaryHover: '#3b82f6'
    }
  }
};

// Get current theme
export function getCurrentTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return saved || 'light';
}

// Set theme
export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

// Apply theme to document
export function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Toggle theme
export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}

// Initialize theme on app load
export function initTheme() {
  const theme = getCurrentTheme();
  applyTheme(theme);
  return theme;
}
