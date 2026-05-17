import React from 'react';
import { useFeedbackStore } from '../store/feedbackStore';
import { formatFeedbackDate, formatFeedbackTime } from '../utils/time';

const FeedbackHistory = () => {
  const { feedbacks, openFeedbackModal } = useFeedbackStore();

  const truncateDescription = (desc: string) => {
    if (!desc) return '-';
    const cleanDesc = desc.trim();
    if (cleanDesc.length <= 20) return `- ${cleanDesc}`;
    return `- ${cleanDesc.substring(0, 20)}...`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Page headers inside content area */}
      <div>
        <p className="text-sm text-gray-400 mb-6 font-normal">
          Browse your previous feedback submissions
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-sm text-gray-400 font-normal">
              <th className="px-6 py-3 text-left font-normal">Title</th>
              <th className="px-6 py-3 text-left font-normal">Rating</th>
              <th className="px-6 py-3 text-left font-normal">Description</th>
              <th className="px-6 py-3 text-left font-normal">Date</th>
              <th className="px-6 py-3 text-left font-normal">Time</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              /* EMPTY STATE */
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-medium text-gray-700 text-base">No feedbacks yet</p>
                    <button
                      onClick={openFeedbackModal}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 mt-4 transition-colors font-medium"
                    >
                      Give Feedback
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              /* FILLED STATE */
              feedbacks.map((item) => (
                <tr 
                  key={item.id} 
                  className="bg-white border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {item.title || 'My First Call'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-normal">
                    {item.rating}/5
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-normal truncate max-w-xs" title={item.description}>
                    {truncateDescription(item.description)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-normal">
                    {formatFeedbackDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-normal">
                    {formatFeedbackTime(item.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackHistory;
