'use client';

import { useProfile } from '@/modules/profile/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProfileCard } from '@/modules/profile/components/ProfileCard';

import { HttpError } from '@/modules/profile/service';

export default function DashboardPage() {
  const { data: profile, isLoading, isError, error } = useProfile();
  const router = useRouter();

  useEffect(() => {
    // If there's a 404 error, it means the profile doesn't exist, so redirect to onboarding
    if (!isLoading && error instanceof HttpError && error.status === 404) {
      router.replace('/onboarding');
    }
  }, [isLoading, isError, error, router]);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  // A different error state for non-404 errors
  if (isError && !(error instanceof HttpError && error.status === 404)) {
      return <div>There was an error loading your dashboard.</div>
  }

  // If profile is not complete, show nothing while redirecting
  if (!profile?.onboarding_completed) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
            <ProfileCard />
        </div>
        <div className="md:col-span-2">
            {/* Other dashboard content will go here */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-bold">Welcome!</h2>
                <p className="text-muted-foreground mt-2">Your journey awaits. Track your quests, manage your skills, and view your progress right here.</p>
            </div>
        </div>
      </div>
    </div>
  );
}