// src/modules/profile/service.ts
import { apiClient } from '@/core/api/client';
import { getAuthTokens } from '@/modules/auth/actions';
import {
  Archetype,
  LifeArea,
  LifeMode,
  OnboardingRequest,
  Profile,
} from './types';

// Custom error for handling specific HTTP statuses
export class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

// ====================================================================
// CLIENT-SIDE FUNCTIONS (for use in hooks)
// ====================================================================

/** [CLIENT] Fetches the user's profile. */
export const getProfileMe = async (): Promise<Profile> => {
  const response = await fetch('/api/profiles/me');
  if (!response.ok) {
    if (response.status === 404) {
      // This is a special case where a 404 means the profile is not yet created.
      // We'll throw an error with a specific message to handle it in the query.
      throw new HttpError('Profile not found. User may need to onboard.', 404);
    }
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

/** [CLIENT] Fetches all available archetypes. */
export const getArchetypes = async (): Promise<Archetype[]> => {
  const response = await fetch('/api/profiles/archetypes');
  if (!response.ok) throw new Error('Failed to fetch archetypes');
  return response.json();
};

/** [CLIENT] Fetches all available life modes. */
export const getLifeModes = async (): Promise<LifeMode[]> => {
  const response = await fetch('/api/profiles/life-modes');
  if (!response.ok) throw new Error('Failed to fetch life modes');
  return response.json();
};

/** [CLIENT] Fetches all available life areas. */
export const getLifeAreas = async (): Promise<LifeArea[]> => {
  const response = await fetch('/api/profiles/life-areas');
  if (!response.ok) throw new Error('Failed to fetch life areas');
  return response.json();
};

// ====================================================================
// SERVER-SIDE FUNCTIONS (for use in actions and API routes)
// ====================================================================

/** [SERVER] Fetches the user's profile. */
export const serverGetProfileMe = async (): Promise<Profile> => {
  const { access } = await getAuthTokens();
  const response = await apiClient.get<Profile>('/profiles/me', {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data;
};

/** [SERVER] Creates the initial user profile during onboarding. */
export const onboardUser = async (
  data: OnboardingRequest,
): Promise<Profile> => {
  const { access } = await getAuthTokens();
  const response = await apiClient.post<Profile>('/profiles/onboarding', data, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data;
};

/** [SERVER] Updates a user's profile. */
export const updateProfile = async (
  data: Partial<OnboardingRequest>,
): Promise<Profile> => {
  const { access } = await getAuthTokens();
  const response = await apiClient.patch<Profile>('/profiles/me', data, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data;
};
