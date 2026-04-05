'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';
import { loginSchema, LoginFormInputs } from '@/lib/schemas';
import { loginAction, FormState } from '@/modules/auth/actions';
import { GoogleLoginBtn } from '@/modules/auth/components/GoogleLoginBtn';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full group overflow-hidden bg-ember hover:bg-ember-dim text-black font-bold py-3 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20" />
      <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.25em] font-display text-sm">
        {pending ? 'AUTHENTICATING...' : 'AUTHORIZE ACCESS'}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </span>
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      console.error('Login failed:', state.message);
    }
  }, [state]);

  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 border border-amethyst/20 rounded-full animate-spin-slow pointer-events-none" />
      <div
        className="absolute -right-20 -top-20 w-64 h-64 border-t border-l border-amethyst/40 rounded-full animate-spin-slow pointer-events-none"
        style={{ animationDuration: '15s' }}
      />
      <div className="absolute -left-20 -bottom-20 w-48 h-48 border border-ember/10 rounded-full animate-spin-reverse-slow pointer-events-none" />

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b border-white/5 pb-4 relative z-20">
        <div className="cursor-pointer group px-4 py-1">
          <span className="text-xs font-mono tracking-widest text-ember font-bold glow-text">
            [ EXISTING_AGENT ]
          </span>
          <div className="h-[1px] w-full bg-ember mt-1" />
        </div>
        <div className="w-[1px] bg-white/10 h-4 self-center mx-2" />
        <Link href="/register" className="cursor-pointer group px-4 py-1">
          <span className="text-xs font-mono tracking-widest text-gray-500 hover:text-amethyst transition-all duration-300">
            [ NEW_RECRUIT ]
          </span>
          <div className="h-[1px] w-0 bg-amethyst group-hover:w-full transition-all duration-300 mt-1" />
        </Link>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="text-ember mb-2 relative">
          <div className="absolute inset-0 bg-ember/20 blur-md rounded-full" />
          <svg
            className="relative z-10 w-10 h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-[0.2em] text-white leading-none font-display">
          RENMA
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-1.5 w-1.5 bg-ember rounded-full animate-pulse" />
          <span className="text-[10px] text-amethyst font-mono tracking-[0.3em]">
            EMBER_SYSTEM_ACCESS
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-5 relative z-10"
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formAction(formData);
        })}
      >
        {/* Error Message */}
        {state.message && !state.success && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm font-mono">
            <span className="text-red-500">[ERROR]</span> {state.message}
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-bold text-ember tracking-[0.2em] font-display uppercase">
              Agent_ID
            </label>
            <span className="text-[8px] font-mono text-gray-600">REQ_FIELD_01</span>
          </div>
          <div className="auth-input-wrapper">
            <input
              type="email"
              {...register('email')}
              className="auth-input"
              placeholder="ENTER IDENTIFIER"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-400 text-[10px] font-mono mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-bold text-ember tracking-[0.2em] font-display uppercase">
              Passcode
            </label>
            <span className="text-[8px] font-mono text-gray-600">REQ_FIELD_02</span>
          </div>
          <div className="auth-input-wrapper">
            <input
              type="password"
              {...register('password')}
              className="auth-input"
              placeholder="••••••••••••"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-400 text-[10px] font-mono mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-4 h-4 border border-gray-600 bg-transparent peer-checked:bg-ember peer-checked:border-ember transition-all" />
            </div>
            <span className="text-[10px] text-gray-400 font-mono tracking-wide group-hover:text-gray-200 transition-colors">
              MAINTAIN_SESSION
            </span>
          </label>
          <a
            href="#"
            className="text-[10px] text-amethyst hover:text-white font-mono tracking-wide transition-colors border-b border-transparent hover:border-amethyst"
          >
            RESET_CREDENTIALS?
          </a>
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <SubmitButton />
        </div>

        {/* Google Login */}
        <GoogleLoginBtn />
      </form>

      {/* Security Status Footer */}
      <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <span className="text-[10px] text-success-neon font-mono tracking-widest">
              BIOMETRIC VERIFIED
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">LAT: 34.0522</span>
        </div>
        <div className="w-full bg-gray-800 h-[2px]">
          <div className="bg-success-neon h-full w-[85%] relative overflow-hidden">
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-mono text-gray-500">
          <span>SECURITY LEVEL: 4</span>
          <span>SYNCING...</span>
        </div>
      </div>
    </div>
  );
}