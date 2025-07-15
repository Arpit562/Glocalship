
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Package, Menu, X, Globe, Truck, Calculator, User } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';
import { auth } from '@/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Tracking', path: '/tracking', icon: Truck },
    { name: 'Pricing', path: '/pricing', icon: Calculator },
  ];

  const handleAuthClick = () => {
    toast({
      title: "🚧 Authentication Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowAccount(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ShipForward</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => setShowAccount(true)}
                  className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 hover:ring-purple-500/40 transition-all duration-200 focus:outline-none"
                  aria-label="Account"
                >
                  <User className="h-6 w-6 text-white" />
                </button>
                {showAccount && (
                  <div className="fixed top-20 right-8 z-50 bg-[#232946] text-white rounded-xl shadow-lg p-6 min-w-[260px] border border-white/10">
                    <div className="mb-2 font-semibold text-lg">Account</div>
                    <div className="mb-2 text-sm text-blue-300">{user.email}</div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2" onClick={handleLogout}>
                      Log Out
                    </Button>
                    <Button variant="ghost" className="w-full mt-2 text-gray-400" onClick={() => setShowAccount(false)}>
                      Close
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 mt-4 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link to="/signup" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600" onClick={handleAuthClick}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
