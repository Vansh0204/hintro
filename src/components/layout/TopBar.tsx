import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { LogoutModal } from '../dashboard/LogoutModal';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Map path to title
  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':       return 'Dashboard';
      case '/call-insights':   return 'Call Insights';
      case '/knowledge-base':  return 'Knowledge Base';
      case '/prompts':         return 'Prompts';
      case '/boxy-controls':   return 'Boxy Controls';
      case '/feedback-history': return 'Feedback History';
      default: return 'Dashboard';
    }
  };

  const initials = profile?.firstName && profile?.lastName 
    ? `${profile.firstName[0]}${profile.lastName[0]}` 
    : 'U';

  return (
    <>
      <header className="h-[56px] min-h-[56px] bg-white border-b border-gray-200 flex items-center px-6 justify-between select-none">
        <div className="flex items-center gap-3">
          {/* Hamburger menu shown on screens < 1024px (hidden on lg and above) */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Open Sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-semibold text-xl text-gray-900">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center gap-3 relative">
          {/* Hide Watch Tutorial button on screens < 768px (hidden md:flex hides it by default and displays it at md breakpoint) */}
          <button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Play size={14} className="fill-current text-gray-600" />
            Watch Tutorial
          </button>
          
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            <div className="h-[36px] w-[36px] rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
              {initials}
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsLogoutOpen(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </>
  );
};
