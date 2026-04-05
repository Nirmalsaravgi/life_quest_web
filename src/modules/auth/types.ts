// src/modules/auth/types.ts

/**
 * The response from a successful authentication request (login or register).
 */
export interface AuthResponse {
  access_token: string;
  refresh_token?: string; // Made optional as it might not always be present or returned.
  is_new_user: boolean;
  user_id: string;
}

/**
 * The request payload for email/password registration.
 */
export interface RegisterRequest {
  email: string;
  password_hash: string;
}

/**
 * The request payload for email/password login.
 */
export interface LoginRequest {
  email: string;
  password_hash: string;
}

/**
 * The request payload for Google OAuth authentication.
 */
export interface GoogleLoginRequest {
  id_token: string;
}

/**
 * Represents the API error structure for validation failures.
 */
export interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

/**
 * Represents the generic API error response.
 */
export interface ApiError {
  type: string;
  message: string;
  errors?: ValidationError[];
}