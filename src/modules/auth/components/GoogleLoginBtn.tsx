'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleLoginAction } from '@/modules/auth/actions';

export function GoogleLoginBtn() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setError(null);
    setIsLoading(true);
    if (credentialResponse.credential) {
      const response = await googleLoginAction(credentialResponse.credential);
      if (response.success && response.redirect) {
        router.push(response.redirect);
      } else {
        setError(response.message || 'An unknown error occurred.');
        setIsLoading(false);
      }
    } else {
      setError('Google login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError('Google login failed. Please try again.');
  };

  if (isLoading) {
    return (
      <div className="w-full relative group overflow-hidden border border-amethyst/30 bg-charcoal/50 transition-all duration-300">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amethyst to-transparent opacity-50" />
        <div className="relative z-10 flex items-center justify-center gap-3 tracking-[0.15em] font-display text-xs py-3 px-6 text-white">
          <svg
            className="w-4 h-4 fill-white opacity-80 animate-spin"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>CONNECTING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Styled container for Google button */}
      <div className="w-full relative group overflow-hidden border border-amethyst/30 hover:border-amethyst/60 bg-charcoal/50 hover:bg-amethyst/10 transition-all duration-300">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amethyst to-transparent opacity-50" />
        
        {/* Custom label that shows above the Google button */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-none z-10">
          <svg
            className="w-4 h-4 fill-white opacity-80 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12s5.333 12 11.947 12c3.6 0 6.12-1.2 8.067-3.2 2.013-2.013 2.613-4.947 2.613-7.387 0-.52-.067-1.04-.147-1.493h-10.53z" />
          </svg>
          <span className="tracking-[0.15em] font-display text-xs text-white">
            CONTINUE WITH GOOGLE
          </span>
        </div>

        {/* Actual Google button - made transparent but clickable */}
        <div className="relative z-20 [&>div]:!bg-transparent [&_iframe]:!opacity-0 [&>div]:!border-0 [&>div]:!shadow-none">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            width="400"
            theme="filled_black"
            size="large"
            text="continue_with"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-[10px] font-mono mt-2 text-center">
          <span className="text-red-500">[ERROR]</span> {error}
        </p>
      )}
    </div>
  );
}