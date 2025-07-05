import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiMap,
  FiBriefcase,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

const navLinks = [
  { to: '/', label: 'Home', icon: <FiHome /> },
  { to: '/destinations', label: 'Destinations', icon: <FiMap /> },
  { to: '/trips', label: 'Trips', icon: <FiBriefcase /> },
  { to: '/profile', label: 'Profile', icon: <FiUser /> },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const authLinks = user
    ? [
        {
          label: 'Logout',
          icon: <FiLogOut />,
          action: () => logout(),
        },
      ]
    : [
        { to: '/login', label: 'Login', icon: <FiLogIn /> },
        { to: '/signup', label: 'Sign Up', icon: <FiUserPlus /> },
      ];

  return (
    <header className="w-full bg-surface border-b border-border shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-3xl font-bold text-accent leading-none"
          >
            Travel buddy
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
          {user?.email && (
            <span className="text-sm text-subtext hidden md:block">
              Hi, {user.email}
            </span>
          )}

          <nav className="hidden md:flex items-center space-x-4">
            {authLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-subtext hover:text-accent transition-colors flex items-center space-x-1"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ) : (
                <button
                  key="logout"
                  onClick={link.action}
                  className="text-subtext hover:text-accent transition-colors flex items-center space-x-1"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              )
            )}
          </nav>

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
            className="md:hidden bg-surface border-t border-border overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.nav
              className="flex flex-col px-4 py-2 space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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

              {authLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center space-x-2 py-2 text-subtext hover:text-accent transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ) : (
                  <button
                    key="logout-mobile"
                    onClick={() => {
                      link.action?.();
                      setMobileOpen(false);
                    }}
                    className="flex items-center space-x-2 py-2 text-subtext hover:text-accent transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                )
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;