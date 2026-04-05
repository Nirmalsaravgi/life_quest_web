// src/modules/user/service.ts
import { apiClient } from '@/core/api/client';
import { User } from './types';
import { getAuthTokens } from '@/modules/auth/actions';

/**
 * [SERVER-SIDE] Fetches the currently authenticated user's data from the backend API.
 * This function is intended for use in Server Components, Server Actions, or API Routes.
 * @returns A promise that resolves to the user object.
 */
export const serverGetUserMe = async (): Promise<User> => {
  const { access } = await getAuthTokens();
  if (!access) {
    throw new Error('Not authorized');
  }
  const response = await apiClient.get<User>('/users/me', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

/**
 * [CLIENT-SIDE] Fetches the currently authenticated user's data by calling our own API route.
 * This function is for use in client-side components (e.g., via React Query hooks).
 * @returns A promise that resolves to the user object.
 */
export const getUserMe = async (): Promise<User> => {
  // Use the browser's fetch to call our own API route.
  // The browser will automatically send the httpOnly cookies.
  const response = await fetch('/api/users/me');
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};
