import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../api';
import { useUserStore } from '../store/userStore';

export function useDashboard() {
  const userId = useUserStore((s) => s.currentUserId);
  return useQuery({ queryKey: ['dashboard', userId], queryFn: () => getDashboard(userId) });
}
