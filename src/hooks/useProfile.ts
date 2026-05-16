import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api';
import { useUserStore } from '../store/userStore';

export function useProfile() {
  const userId = useUserStore((s) => s.currentUserId);
  return useQuery({ queryKey: ['profile', userId], queryFn: () => getProfile(userId), staleTime: 30000 });
}
