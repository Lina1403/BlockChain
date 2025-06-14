import React from 'react';
import { motion } from 'framer-motion';
import { Dna, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <Dna className="h-8 w-8 text-cyan-400" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-8 h-8 border-2 border-cyan-400/30 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">BioNFT</h1>
            <p className="text-xs text-cyan-300">DNA Storage Platform</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white">
            <UserIcon className="h-5 w-5" />
            <span className="font-medium">{user.name}</span>
            {user.role === 'admin' && <Shield className="h-4 w-4 text-yellow-400" />}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;