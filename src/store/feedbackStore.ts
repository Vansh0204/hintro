import { create } from 'zustand';

export interface FeedbackEntry {
  id: string;
  title: string;
  rating: number;
  description: string;
  createdAt: string;
}

interface FeedbackStore {
  feedbacks: FeedbackEntry[];
  isFeedbackModalOpen: boolean;
  addFeedback: (entry: Omit<FeedbackEntry, 'id' | 'createdAt'>) => void;
  openFeedbackModal: () => void;
  closeFeedbackModal: () => void;
}

const STORAGE_KEY = 'hintro_feedbacks';

function loadFromStorage(): FeedbackEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbacks: loadFromStorage(),
  isFeedbackModalOpen: false,
  addFeedback: (entry) => {
    const newEntry: FeedbackEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      const updated = [newEntry, ...state.feedbacks];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { feedbacks: updated };
    });
  },
  openFeedbackModal: () => set({ isFeedbackModalOpen: true }),
  closeFeedbackModal: () => set({ isFeedbackModalOpen: false }),
}));
