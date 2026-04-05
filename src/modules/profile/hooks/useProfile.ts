'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getProfileMe,
  getArchetypes,
  getLifeModes,
  getLifeAreas,
  HttpError,
} from '../service';

/**
 * Hook to fetch the current user's profile.
 * It has custom retry logic: it will not retry on a 404 error,
 * as this indicates the user has not completed onboarding.
 */
export function useProfile() {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getProfileMe,
    retry: (failureCount, error: unknown) => {
      // Don't retry on 404 (profile not found = needs onboarding)
      if (error instanceof HttpError && error.status === 404) return false;
      return failureCount < 3;
    },
  });
}

/**
 * Hook to fetch the list of available archetypes.
 */
export function useArchetypes() {
  return useQuery({
    queryKey: ['profile', 'archetypes'],
    queryFn: getArchetypes,
    staleTime: Infinity, // This data is static
  });
}

/**
 * Hook to fetch the list of available life modes.
 */
export function useLifeModes() {
  return useQuery({
    queryKey: ['profile', 'life-modes'],
    queryFn: getLifeModes,
    staleTime: Infinity, // This data is static
  });
}

/**
 * Hook to fetch the list of available life areas.
 */
export function useLifeAreas() {
  return useQuery({
    queryKey: ['profile', 'life-areas'],
    queryFn: getLifeAreas,
    staleTime: Infinity, // This data is static
  });
}