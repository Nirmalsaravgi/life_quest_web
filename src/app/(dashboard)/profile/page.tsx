'use client';

import { ProfileCard } from '@/modules/profile/components/ProfileCard';
import { useProfile } from '@/modules/profile/hooks/useProfile';

export default function ProfilePage() {
    const { data: profile, isLoading, isError } = useProfile();

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (isError || !profile) {
        return <div>Could not load profile.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <ProfileCard />
                </div>
                <div className="md:col-span-2">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Profile Details</h2>
                        <div className="mt-4 space-y-2">
                            <p><strong>Player Name:</strong> {profile.player_name}</p>
                            <p><strong>Level:</strong> {profile.level}</p>
                            <p><strong>XP:</strong> {profile.total_core_xp}</p>
                            <p><strong>Archetype:</strong> {profile.archetype.name}</p>
                            <p><strong>Life Mode:</strong> {profile.life_mode.name}</p>
                            <p><strong>Timezone:</strong> {profile.timezone}</p>
                            {profile.identity_locked_until && (
                                <p><strong>Identity Locked Until:</strong> {new Date(profile.identity_locked_until).toLocaleString()}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}