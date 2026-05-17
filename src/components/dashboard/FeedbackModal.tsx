import React, { useState, useEffect, useRef } from 'react';
import { useFeedbackStore } from '../../store/feedbackStore';
import { Star, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FeedbackModal = () => {
  const { isFeedbackModalOpen, closeFeedbackModal } = useFeedbackStore();
  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [step, setStep] = useState<1 | 2>(1);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount or modal close
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Reset state when modal is opened/closed
  useEffect(() => {
    if (isFeedbackModalOpen) {
      setRating(0);
      setHoveredRating(0);
      setComment('');
      setStep(1);
    }
  }, [isFeedbackModalOpen]);

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    closeFeedbackModal();
  };

  const getLabelAndPlaceholder = () => {
    if (rating >= 4) return "What did you like the most?";
    if (rating <= 2) return "What could be improved?";
    return "Tell us more";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    addFeedback({
      title: "My First Call",
      rating,
      description: comment,
    });

    setStep(2);

    // Auto close after 3 seconds
    timeoutRef.current = setTimeout(() => {
      closeFeedbackModal();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 1 ? handleClose : undefined} // Prevent clicking overlay to close during thank you screen
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8 relative overflow-hidden z-10"
          >
            {step === 1 ? (
              /* STEP 1: Rating Screen */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Give Feedback</h2>
                  <p className="text-sm text-gray-400 mt-1">Describe your experience using Hintro...</p>
                </div>

                {/* Star Row */}
                <div className="flex justify-center gap-2 py-4">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoveredRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform duration-100 hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={40}
                          className={isFilled ? 'text-amber-500 fill-current' : 'text-gray-300'}
                          style={{ color: isFilled ? '#F59E0B' : undefined }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Comment Textarea (only shows when rating > 0) */}
                <AnimatePresence>
                  {rating > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-sm text-gray-600 mb-2 font-medium">
                        {getLabelAndPlaceholder()}
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={getLabelAndPlaceholder()}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-6 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="border border-gray-300 hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={rating === 0}
                    className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                      rating === 0
                        ? 'bg-gray-700 text-white opacity-50 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-800 text-white'
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              /* STEP 2: Acknowledgement Screen */
              <div className="flex flex-col items-center justify-center py-6 text-center">
                {/* Close button X */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <X size={20} />
                </button>

                {/* Yellow star circle */}
                <div className="w-[80px] h-[80px] rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Star size={40} className="text-yellow-400 fill-current" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-4 leading-tight">
                  Thank you for your feedback!!
                </h3>
                <p className="text-sm text-gray-400 mt-2 max-w-sm leading-relaxed">
                  Our team reviews every suggestion to improve AI responses, workflows, and overall experience.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
