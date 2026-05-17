import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useUserStore } from '../../store/userStore';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const Layout = () => {
  const { currentUserId, setUserId } = useUserStore();
  const queryClient = useQueryClient();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleUserSwitch = (userId: 'u1' | 'u2') => {
    setUserId(userId);
    // Invalidate react-query cache to force a fresh fetch
    queryClient.invalidateQueries();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Responsive Sidebar Drawer */}
      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar toggles mobile menu */}
        <TopBar onMenuClick={() => setIsMobileOpen(true)} />
        
        {/* Main Content Area with Opacity Transition on User Change */}
        <motion.main 
          key={currentUserId}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-1 overflow-y-auto bg-white p-6"
        >
          <Outlet />
        </motion.main>
      </div>

      {/* Demo User Switcher Pill */}
      <div className="fixed bottom-5 right-5 z-50 bg-white border border-gray-300 rounded-full shadow-md px-3 py-1.5 flex items-center gap-2">
        <span className="text-xs text-gray-500">Viewing as:</span>
        <button
          onClick={() => handleUserSwitch('u1')}
          className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
            currentUserId === 'u1' ? 'bg-primary text-white font-medium' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          u1
        </button>
        <button
          onClick={() => handleUserSwitch('u2')}
          className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
            currentUserId === 'u2' ? 'bg-primary text-white font-medium' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          u2
        </button>
      </div>
    </div>
  );
};

export default Layout;
