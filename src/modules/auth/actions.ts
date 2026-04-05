'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '@/lib/schemas';
import * as authService from './service';
import { ApiError } from './types';

const COOKIE_ACCESS = 'lq_access';
const COOKIE_REFRESH = 'lq_refresh';

// Helper function to set cookies
const setAuthCookies = (access_token: string, refresh_token?: string) => {
  const cookieStore = cookies();

  cookieStore.set(COOKIE_ACCESS, access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 60, // 30 minutes
  });

  if (refresh_token) {
    cookieStore.set(COOKIE_REFRESH, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }
};

// Helper function to clear cookies
const clearAuthCookies = () => {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_ACCESS);
  cookieStore.delete(COOKIE_REFRESH);
};

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

/**
 * Action to handle user registration.
 */
export async function registerAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const { access_token, refresh_token } = await authService.register({
      email,
      password_hash: password, // The service expects password_hash
    });

    setAuthCookies(access_token, refresh_token);

    // New users always need onboarding since they don't have a profile yet
    redirect('/onboarding');
  } catch (error) {
    // Check if it's a redirect (Next.js throws NEXT_REDIRECT)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    const apiError = error as ApiError;
    return {
      message: apiError.message || 'Registration failed.',
      success: false,
    };
  }
}

/**
 * Action to handle user login.
 */
export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const { access_token, refresh_token } = await authService.login({
      email,
      password_hash: password, // The service expects password_hash
    });

    setAuthCookies(access_token, refresh_token);

    // Check if user has a profile to determine redirect destination
    let redirectTo = '/dashboard';
    try {
      const { serverGetProfileMe } = await import('@/modules/profile/service');
      await serverGetProfileMe();
      // Profile exists, go to dashboard
    } catch (profileError: unknown) {
      // Profile doesn't exist (404), need onboarding
      if (profileError && typeof profileError === 'object' && 'status' in profileError && profileError.status === 404) {
        redirectTo = '/onboarding';
      } else if (profileError instanceof Error && profileError.message.includes('404')) {
        redirectTo = '/onboarding';
      } else {
        // Check if it's an axios error with 404 status
        const axiosError = profileError as { response?: { status?: number } };
        if (axiosError?.response?.status === 404) {
          redirectTo = '/onboarding';
        }
      }
    }

    redirect(redirectTo);
  } catch (error) {
    // Check if it's a redirect (Next.js throws NEXT_REDIRECT)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    const apiError = error as ApiError;
    if (apiError.type === 'invalid_credentials') {
      return {
        message: 'Invalid email or password.',
        success: false,
      }
    }
    return {
      message: apiError.message || 'Login failed.',
      success: false,
    };
  }
}

/**
 * Action to handle Google OAuth login.
 */
export async function googleLoginAction(idToken: string) {
  try {
    const { access_token, refresh_token } = await authService.googleLogin({ id_token: idToken });
    setAuthCookies(access_token, refresh_token);

    // Check if user has a profile to determine redirect destination
    let redirectTo = '/dashboard';
    try {
      const { serverGetProfileMe } = await import('@/modules/profile/service');
      await serverGetProfileMe();
      // Profile exists, go to dashboard
    } catch (profileError: unknown) {
      // Profile doesn't exist (404), need onboarding
      const axiosError = profileError as { response?: { status?: number } };
      if (axiosError?.response?.status === 404) {
        redirectTo = '/onboarding';
      }
    }

    return { success: true, redirect: redirectTo };

  } catch (error) {
    const apiError = error as ApiError;
    return { success: false, message: apiError.message || 'Google login failed.' };
  }
}

/**
 * Action to log out the user.
 */
export async function logoutAction() {
  await authService.logout();
  clearAuthCookies();
  redirect('/login');
}

/**
 * Action to log out from all devices.
 */
export async function logoutAllAction() {
  await authService.logoutAll();
  clearAuthCookies();
  redirect('/login');
}

/**
 * Helper to get authentication tokens from cookies.
 */
export async function getAuthTokens() {
  const cookieStore = cookies();
  const access = cookieStore.get(COOKIE_ACCESS)?.value;
  const refresh = cookieStore.get(COOKIE_REFRESH)?.value;
  return { access, refresh };
}

/**
 * Action to refresh authentication tokens.
 */
export async function refreshTokenAction() {
  const { refresh } = await getAuthTokens();
  if (!refresh) {
    return { success: false, message: 'No refresh token found.' };
  }

  try {
    const { access_token, refresh_token } = await authService.refreshToken(refresh);
    setAuthCookies(access_token, refresh_token);
    return { success: true };
  } catch (error) {
    clearAuthCookies();
    const apiError = error as ApiError;
    return { success: false, message: apiError.message || 'Failed to refresh token.' };
  }
}