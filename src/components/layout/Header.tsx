import React from 'react';
import { Router } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConnectWalletButton } from '../common/ConnectWalletButton';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full backdrop-blur-md bg-[#0A0A0A]/15 border-b border-white/10 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Router className="w-8 h-8 text-[#00FF94] animate-pulse" />
            <span className="text-white font-bold text-xl">MemePort</span>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <Navigation />
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}