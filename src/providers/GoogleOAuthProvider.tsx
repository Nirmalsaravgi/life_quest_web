'use client'

import { GoogleOAuthProvider as Provider } from '@react-oauth/google';

export function GoogleOAuthProvider({ children }: { children: React.ReactNode }) {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
        console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Google OAuth will not work.");
        return <>{children}</>;
    }

    return (
        <Provider clientId={googleClientId}>
            {children}
        </Provider>
    );
}