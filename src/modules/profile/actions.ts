'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { onboardUser } from './service';
import { OnboardingRequest } from './types';
import { ApiError } from '../auth/types'; // Re-using ApiError type

export async function onboardingAction(data: OnboardingRequest) {
  try {
    await onboardUser(data);
  } catch (error) {
    const apiError = error as ApiError;
    return {
      success: false,
      message: apiError.message || 'Onboarding failed. Please try again.',
    };
  }

  // Revalidate the profile path and redirect to the dashboard
  revalidatePath('/profile');
  redirect('/dashboard');
}