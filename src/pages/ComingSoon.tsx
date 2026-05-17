import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

const routeNames: Record<string, string> = {
  '/call-insights': 'Call Insights',
  '/knowledge-base': 'Knowledge Base',
  '/prompts': 'Prompts',
  '/boxy-controls': 'Boxy Controls',
};

const ComingSoon = () => {
  const { pathname } = useLocation();
  const pageName = routeNames[pathname] || 'This page';

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
        <Construction size={32} className="text-primary" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mt-2">{pageName}</h2>
      <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
        This feature is coming soon. Stay tuned for updates!
      </p>
    </div>
  );
};

export default ComingSoon;
