import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Phone, FileText, MessageSquare, Globe, Info, ClipboardList, Gift, X } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { useUserStore } from '../../store/userStore';
import { useFeedbackStore } from '../../store/feedbackStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { data: dashboard } = useDashboard();
  const { currentUserId } = useUserStore();
  const openFeedbackModal = useFeedbackStore((s) => s.openFeedbackModal);
  const { pathname } = useLocation();

  const mainLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/call-insights', icon: Phone, label: 'Call Insights' },
    { to: '/knowledge-base', icon: FileText, label: 'Knowledge Base', hasInfo: true },
    { to: '/prompts', icon: MessageSquare, label: 'Prompts', hasInfo: true },
    { to: '/boxy-controls', icon: Globe, label: 'Boxy Controls', hasInfo: true },
  ];

  const usageUsed = currentUserId === 'u1' ? 0 : dashboard?.usage?.kb_files?.used || 0;
  const usageLimit = currentUserId === 'u1' ? 1000 : dashboard?.usage?.kb_files?.limit || 1000;
  const usagePercentage = currentUserId === 'u1' ? 0 : dashboard?.usage?.kb_files?.percentage || 0;

  const renderNavContent = () => (
    <>
      <div className="h-[56px] flex items-center justify-between px-5 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-black tracking-tight">Hintro</h1>
        {/* Mobile close button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="p-3 space-y-1">
        {mainLinks.map((link) => {
          const isActive = pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose} // Auto close mobile drawer on click
              className={`
                h-10 flex items-center justify-between px-3 rounded-lg text-sm transition-colors duration-150
                ${isActive 
                  ? 'bg-primary-light text-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} className={isActive ? 'text-primary' : 'text-gray-500'} />
                {link.label}
              </div>
              {link.hasInfo && (
                <Info size={16} className="text-gray-300" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-200 p-3 flex flex-col">
        <nav className="space-y-1 mb-4">
          {/* Feedback History Link */}
          <Link
            to="/feedback-history"
            onClick={onClose}
            className={`
              h-10 flex items-center gap-3 px-3 rounded-lg text-sm transition-colors duration-150
              ${pathname === '/feedback-history' 
                ? 'bg-primary-light text-primary font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <ClipboardList size={18} className={pathname === '/feedback-history' ? 'text-primary' : 'text-gray-500'} />
            Feedback History
          </Link>

          {/* Trigger for Feedback Modal */}
          <button
            onClick={() => {
              onClose();
              openFeedbackModal();
            }}
            className="w-full h-10 flex items-center gap-3 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
          >
            <Gift size={18} className="text-gray-500" />
            Feedback
          </button>
        </nav>

        <div className="px-3 pb-3">
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-bold text-gray-700">{usageUsed} of {usageLimit}</span> hours used
          </p>
          <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full bg-gray-400 rounded-full transition-all duration-300" 
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          
          <button className="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg h-9 text-sm font-medium transition-colors">
            Upgrade
          </button>
        </div>
      </div>

      <div className="py-3 text-center border-t border-gray-200">
        <p className="text-xs text-gray-400">© 2025 Hintro. Made in India 🇮🇳</p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-gray-200 h-full shrink-0 select-none">
        {renderNavContent()}
      </aside>

      {/* Mobile sidebar overlay drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Drawer Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-200 flex flex-col z-50"
            >
              {renderNavContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
