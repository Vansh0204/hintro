import { useQuery } from '@tanstack/react-query';
import { getCallHistory } from '../api';
import { useUserStore } from '../store/userStore';

export function useCallHistory(limit = 10) {
  const userId = useUserStore((s) => s.currentUserId);
  return useQuery({ queryKey: ['callHistory', userId, limit], queryFn: () => getCallHistory(userId, limit) });
}
