// src/modules/user/types.ts

/**
 * Represents a user in the system.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  email_verified: boolean;
  provider: 'email' | 'google';
  created_at: string;
  updated_at: string;
}