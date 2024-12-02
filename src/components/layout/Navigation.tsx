import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Exchange', path: '/exchange' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="relative">
      <div className="hidden md:flex space-x-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              px-4 py-2 rounded-lg
              transition-all duration-200
              relative group
              ${location.pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white'}
            `}
          >
            <span className="relative z-10">{item.name}</span>
            {location.pathname === item.path && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.2 }}
            />
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 w-56 mt-2 py-2 bg-[#141414] rounded-lg shadow-xl border border-white/10"
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-2
                  ${location.pathname === item.path ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                `}
              >
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}