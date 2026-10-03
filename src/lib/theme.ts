import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'vcl-theme';

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Light/dark theme. The initial theme is set before the page renders by the
 * inline script in index.html (saved choice, otherwise the device setting).
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  // Follow the device setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {
        // Storage unavailable; keep following the device.
      }
      if (saved) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setThemeState(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice still applies for this visit.
    }
    setThemeState(next);
  };

  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
}
