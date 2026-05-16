import { useQuery } from '@tanstack/react-query';
import { getCallStats } from '../api';
import { useUserStore } from '../store/userStore';

export function useCallStats() {
  const userId = useUserStore((s) => s.currentUserId);
  return useQuery({ queryKey: ['callStats', userId], queryFn: () => getCallStats(userId) });
}
