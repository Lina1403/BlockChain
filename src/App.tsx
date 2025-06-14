<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { User } from './types';
=======
<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import FileUpload from './components/FileUpload/FileUpload';
import DecodeView from './components/Decode/DecodeView';
import AboutPage from './components/About/AboutPage';
>>>>>>> ebed76e (update)

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('bionft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('bionft_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bionft_user');
  };

  if (isLoading) {
    return (
<<<<<<< HEAD
=======
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-lg">Loading BioNFT...</span>
        </div>
=======
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('bionft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('bionft_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bionft_user');
  };

  if (isLoading) {
    return (
>>>>>>> ebed76e (update)
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
<<<<<<< HEAD
=======
>>>>>>> b50eba3 (update)
>>>>>>> ebed76e (update)
      </div>
    );
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
  if (!user) {
    return <Login />;
  }

>>>>>>> ebed76e (update)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Navbar user={user} onLogout={handleLogout} />
            <Dashboard user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
<<<<<<< HEAD
}
=======
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};
=======
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Navbar user={user} onLogout={handleLogout} />
            <Dashboard user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
>>>>>>> b50eba3 (update)
>>>>>>> ebed76e (update)

export default App;