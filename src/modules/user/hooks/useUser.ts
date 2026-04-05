'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserMe } from '../service';

/**
 * A React Query hook for fetching the current user's data.
 * It is configured to not retry on failure, as a 401/403 error
 * is considered a definitive state.
 */
export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getUserMe,
    retry: false,
  });
}