import React from 'react';
import { useCallHistory } from '../../hooks/useCallHistory';
import { formatDuration, formatRelativeTime } from '../../utils/time';
import { Phone, PhoneMissed, MessageSquarePlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useFeedbackStore } from '../../store/feedbackStore';

export const RecentCalls = () => {
  const { data: calls, isLoading } = useCallHistory();
  const { openFeedbackModal } = useFeedbackStore();

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">Recent Calls</h2>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="divide-y divide-border">
        {calls?.map((call) => (
          <div key={call.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${call.status === 'missed' ? 'bg-danger/10 text-danger' : 'bg-primary-light text-primary'}`}>
                {call.status === 'missed' ? <PhoneMissed size={20} /> : <Phone size={20} />}
              </div>
              <div>
                <p className="font-semibold text-black">{call.contactName}</p>
                <div className="flex gap-2 text-sm text-gray-500 mt-1">
                  <span>{formatRelativeTime(call.date)}</span>
                  <span>•</span>
                  <span>{call.duration > 0 ? formatDuration(call.duration) : 'Missed'}</span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openFeedbackModal(call.id)}
              className="gap-2"
            >
              <MessageSquarePlus size={16} />
              <span className="hidden sm:inline">Feedback</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
