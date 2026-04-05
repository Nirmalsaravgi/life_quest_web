'use client';

import { useProfile } from '../hooks/useProfile';
import { useUser } from '@/modules/user/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/Avatar';
import { Badge } from '@/core/components/Badge';

import { ProgressBar } from '@/core/components/ProgressBar';


export function ProfileCard() {
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useProfile();
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUser();

  if (isProfileLoading || isUserLoading) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </CardHeader>
            <CardContent className="text-center">
                <div className="h-6 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </CardContent>
        </Card>
    );
  }

  if (isProfileError || isUserError || !profile || !user) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Could not load profile information.</p>
            </CardContent>
        </Card>
    );
  }
  
  // Calculate XP progress for the current level
  // These are placeholders, actual logic would depend on the backend's XP system.
  const xpForCurrentLevel = 1000;
  const xpProgress = (profile.total_core_xp % xpForCurrentLevel) / xpForCurrentLevel * 100;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={profile.avatar_url || ''} alt={profile.player_name} />
          <AvatarFallback>{profile.player_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle>{profile.player_name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
            <Badge variant="secondary">Level {profile.level}</Badge>
            <span className="text-sm font-medium">{profile.total_core_xp} XP</span>
        </div>
        <ProgressBar value={xpProgress} />
        <div className="text-center space-y-2 pt-4">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Archetype</p>
                <p className="font-semibold">{profile.archetype.name}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Life Mode</p>
                <p className="font-semibold">{profile.life_mode.name}</p>
            </div>
        </div>
        {profile.bio && (
            <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}