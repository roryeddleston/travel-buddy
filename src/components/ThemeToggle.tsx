import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="relative w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 border-2 border-accent"
    >
      <div
        className={`w-5 h-6 rounded-full bg-transparent flex items-center justify-center text-sm transition-transform duration-300 transform ${
          theme === 'dark' ? 'translate-x-8' : ''
        }`}
      >
        {theme === 'dark' ? (
          <FiSun size={16} className="text-accent" />
        ) : (
          <FiMoon size={16} className="text-accent" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;