import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiMap,
  FiBriefcase,
  FiUser,
  FiLogIn,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import '../index.css';

const navLinks = [
  { to: '/', label: 'Home', icon: <FiHome /> },
  { to: '/destinations', label: 'Destinations', icon: <FiMap /> },
  { to: '/trips', label: 'Trips', icon: <FiBriefcase /> },
  { to: '/profile', label: 'Profile', icon: <FiUser /> },
  { to: '/login', label: 'Login', icon: <FiLogIn /> },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-surface border-b border-border shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-accent">
            Travel Buddy
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-subtext hover:text-accent transition-colors ${
                  pathname === link.to ? 'text-accent' : ''
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-accent focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-surface border-t border-border"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-2 py-2 text-subtext hover:text-accent transition-colors ${
                    pathname === link.to ? 'text-accent' : ''
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;