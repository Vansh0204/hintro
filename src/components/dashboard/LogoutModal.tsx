import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 relative z-10"
          >
            {/* Content */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Leaving already?</h2>
            
            {/* Divider */}
            <div className="border-t border-gray-100 mb-4" />
            
            {/* Body */}
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              You can log back in anytime to continue your meetings with Hintro.
            </p>

            {/* Bottom Row */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-300 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-black hover:bg-gray-800 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Log out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
