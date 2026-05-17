import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { useProfile } from '../hooks/useProfile';
import { CallSession, Participant } from '../types/api';
import { useCallStats } from '../hooks/useCallStats';
import { useCallHistory } from '../hooks/useCallHistory';
import { StatCard } from '../components/ui/StatCard';
import { Skeleton } from '../components/ui/Skeleton';
import { FeedbackModal } from '../components/dashboard/FeedbackModal';
import { 
  formatAvgDuration, 
  formatLastSession, 
  formatCallGroupDate, 
  formatCallTime 
} from '../utils/time';
import { 
  PieChart, 
  Clock, 
  Sparkles, 
  CalendarDays, 
  Users, 
  MoreHorizontal 
} from 'lucide-react';
import { useFeedbackStore } from '../store/feedbackStore';

const Dashboard = () => {
  const userId = useUserStore((s) => s.currentUserId);
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: stats, isLoading: statsLoading } = useCallStats();
  const { data: callHistoryData, isLoading: historyLoading } = useCallHistory(10);
  const { openFeedbackModal } = useFeedbackStore();

  const firstName = profile?.firstName || (userId === 'u1' ? 'User 1' : 'User 2');
  const callSessions = callHistoryData?.callSessions || [];

  // Group calls by date
  const groupedCalls: { [key: string]: CallSession[] } = {};
  callSessions.forEach((session: CallSession) => {
    const dateKey = formatCallGroupDate(session.started_at);
    if (!groupedCalls[dateKey]) {
      groupedCalls[dateKey] = [];
    }
    groupedCalls[dateKey].push(session);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const aiUsedText = stats?.totalAIInteractions 
    ? `${stats.totalAIInteractions} times` 
    : '0';

  return (
    <motion.div 
      key={userId} 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto pb-12"
    >
      {/* HEADER ROW */}
      <div className="flex justify-between items-start mb-6">
        <div>
          {profileLoading ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900">
              Hi, {firstName} 👋 Welcome to Hintro
            </h1>
          )}
          <p className="text-sm text-gray-500 mt-1 font-normal">
            Ready to make your next call smarter?
          </p>
        </div>
        <button className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          Start New Call
        </button>
      </div>

      {/* STAT CARDS GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            label="Total Sessions"
            value={statsLoading ? '0' : (stats?.totalSessions ?? 0)}
            iconBgClass="bg-red-100"
            iconColorClass="text-red-500"
            icon={PieChart}
            isLoading={statsLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Average Duration"
            value={statsLoading ? '0' : (stats ? formatAvgDuration(stats.averageDuration) : '0')}
            iconBgClass="bg-sky-100"
            iconColorClass="text-sky-600"
            icon={Clock}
            isLoading={statsLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="AI Used"
            value={statsLoading ? '0' : (stats ? aiUsedText : '0')}
            iconBgClass="bg-emerald-100"
            iconColorClass="text-emerald-600"
            icon={Sparkles}
            isLoading={statsLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Last Session"
            value={statsLoading ? '—' : (stats ? formatLastSession(stats.lastSession) : '—')}
            iconBgClass="bg-indigo-100"
            iconColorClass="text-indigo-600"
            icon={CalendarDays}
            isLoading={statsLoading}
          />
        </motion.div>
      </motion.div>

      {/* RECENT CALLS SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4 mt-8">
          Recent calls
        </h2>

        {historyLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        ) : callSessions.length === 0 ? (
          /* EMPTY STATE */
          <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center bg-white shadow-sm">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
              <CalendarDays size={40} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">No Recent Calls</h3>
            <p className="text-sm text-gray-400 text-center max-w-sm mt-2 leading-relaxed">
              Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
            </p>
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 transition-colors">
              Start a Call
            </button>
          </div>
        ) : (
          /* FILLED STATE */
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-6">
              {Object.keys(groupedCalls).map((dateHeader) => (
                <div key={dateHeader}>
                  <h3 className="text-sm text-gray-400 font-medium mb-2">{dateHeader}</h3>
                  <div className="divide-y divide-gray-100">
                    {groupedCalls[dateHeader].map((session: CallSession) => {
                      const clientInitial = session.client ? session.client.charAt(0).toUpperCase() : 'C';
                      return (
                        <div 
                          key={session._id} 
                          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 -mx-4 px-4 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold shrink-0">
                              {clientInitial}
                            </div>
                            {/* Call info */}
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">
                                {session.client || 'Design Call'}
                              </h4>
                              {/* Participants Row */}
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex -space-x-1 overflow-hidden mr-1">
                                  {session.participants.slice(0, 3).map((p: Participant, idx: number) => (
                                    <div 
                                      key={idx} 
                                      className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-semibold"
                                      title={p.name}
                                    >
                                      {p.name.charAt(0).toUpperCase()}
                                    </div>
                                  ))}
                                </div>
                                <Users size={14} className="text-gray-400" />
                                <span className="text-[11px] text-gray-400 font-medium">
                                  {session.participants.length} participants
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Feedback trigger button for demo convenience */}
                            <button
                              onClick={() => openFeedbackModal()}
                              className="text-xs text-primary hover:underline font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Leave Feedback
                            </button>
                            <span className="text-sm text-gray-400 font-normal">
                              {formatCallTime(session.started_at)}
                            </span>
                            <button className="p-1 hover:bg-gray-150 rounded-full transition-colors">
                              <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FeedbackModal />
    </motion.div>
  );
};

export default Dashboard;
