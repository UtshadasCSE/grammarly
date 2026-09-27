'use client';

import { Moon, Sun } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

export function ThemeToggle() {
  const { progress, setTheme } = useProgress();
  const isDark = progress.theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full glass-card text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.8} />
      ) : (
        <Moon size={18} strokeWidth={1.8} />
      )}
    </button>
  );
}
