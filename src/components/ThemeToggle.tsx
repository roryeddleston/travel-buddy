import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
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