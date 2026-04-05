// src/modules/auth/service.ts
import { apiClient } from '@/core/api/client';
import {
  AuthResponse,
  GoogleLoginRequest,
  LoginRequest,
  RegisterRequest,
} from './types';

/**
 * Registers a new user.
 * @param data - The registration data.
 * @returns A promise that resolves to the authentication response.
 */
export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

/**
 * Logs in a user.
 * @param data - The login data.
 * @returns A promise that resolves to the authentication response.
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

/**
 * Logs in a user with Google.
 * @param data - The Google login data.
 * @returns A promise that resolves to the authentication response.
 */
export const googleLogin = async (
  data: GoogleLoginRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/google', data);
  return response.data;
};

/**
 * Refreshes the authentication tokens.
 * @param refreshToken - The refresh token.
 * @returns A promise that resolves to the new authentication response.
 */
export const refreshToken = async (
  refreshToken: string,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};

/**
 * Logs out the current user.
 * @returns A promise that resolves when the user is logged out.
 */
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

/**
 * Logs out the user from all devices.
 * @returns A promise that resolves when the user is logged out from all devices.
 */
export const logoutAll = async (): Promise<void> => {
  await apiClient.post('/auth/logout-all');
};