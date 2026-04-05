'use client';

import { useUser } from '@/modules/user/hooks/useUser';
import { useProfile } from '@/modules/profile/hooks/useProfile';
import { Button } from '@/core/components/Button';
import { logoutAction } from '@/modules/auth/actions';
import Link from 'next/link';

export function Header() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div>
        {/* Can add breadcrumbs or page title here */}
      </div>
      <div className="flex items-center space-x-4">
        {isUserLoading || isProfileLoading ? (
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ) : user && profile ? (
          <>
            <Link href="/profile" className="font-semibold hover:underline">
              {profile.player_name} (Lvl {profile.level})
            </Link>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={handleLogout} variant="ghost" size="sm">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
