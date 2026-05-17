import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { motion } from 'framer-motion';

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Responsive Sidebar Drawer */}
      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar toggles mobile menu */}
        <TopBar onMenuClick={() => setIsMobileOpen(true)} />
        
        {/* Main Content Area */}
        <motion.main 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-1 overflow-y-auto bg-white p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
