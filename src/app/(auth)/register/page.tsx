'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';
import { registerSchema, RegisterFormInputs } from '@/lib/schemas';
import { registerAction, FormState } from '@/modules/auth/actions';
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
      className="relative w-full group overflow-hidden bg-amethyst hover:bg-amethyst-dim text-white font-bold py-3 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20" />
      <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.25em] font-display text-sm">
        {pending ? 'INITIALIZING...' : 'INITIATE RECRUITMENT'}
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
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </span>
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      console.error('Registration failed:', state.message);
    }
  }, [state]);

  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 border border-ember/20 rounded-full animate-spin-slow pointer-events-none" />
      <div
        className="absolute -right-20 -top-20 w-64 h-64 border-t border-l border-ember/40 rounded-full animate-spin-slow pointer-events-none"
        style={{ animationDuration: '15s' }}
      />
      <div className="absolute -left-20 -bottom-20 w-48 h-48 border border-amethyst/10 rounded-full animate-spin-reverse-slow pointer-events-none" />

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b border-white/5 pb-4 relative z-20">
        <Link href="/login" className="cursor-pointer group px-4 py-1">
          <span className="text-xs font-mono tracking-widest text-gray-500 hover:text-ember transition-all duration-300">
            [ EXISTING_AGENT ]
          </span>
          <div className="h-[1px] w-0 bg-ember group-hover:w-full transition-all duration-300 mt-1" />
        </Link>
        <div className="w-[1px] bg-white/10 h-4 self-center mx-2" />
        <div className="cursor-pointer group px-4 py-1">
          <span className="text-xs font-mono tracking-widest text-amethyst font-bold glow-text">
            [ NEW_RECRUIT ]
          </span>
          <div className="h-[1px] w-full bg-amethyst mt-1" />
        </div>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="text-amethyst mb-2 relative">
          <div className="absolute inset-0 bg-amethyst/20 blur-md rounded-full" />
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
          <span className="h-1.5 w-1.5 bg-amethyst rounded-full animate-pulse" />
          <span className="text-[10px] text-ember font-mono tracking-[0.3em]">
            NEW_AGENT_REGISTRATION
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-4 relative z-10"
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
              placeholder="ENTER EMAIL IDENTIFIER"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              placeholder="MIN 8 CHARS + SPECIAL"
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

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-bold text-amethyst tracking-[0.2em] font-display uppercase">
              Confirm_Passcode
            </label>
            <span className="text-[8px] font-mono text-gray-600">REQ_FIELD_03</span>
          </div>
          <div className="auth-input-wrapper">
            <input
              type="password"
              {...register('confirmPassword')}
              className="auth-input"
              placeholder="••••••••••••"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-[10px] font-mono mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center mt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
              <input type="checkbox" className="peer sr-only" required />
              <div className="w-4 h-4 border border-gray-600 bg-transparent peer-checked:bg-amethyst peer-checked:border-amethyst transition-all" />
            </div>
            <span className="text-[10px] text-gray-400 font-mono tracking-wide group-hover:text-gray-200 transition-colors">
              ACCEPT_PROTOCOL_TERMS
            </span>
          </label>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-success-neon font-mono tracking-widest">
              SECURE CONNECTION
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">TLS 1.3</span>
        </div>
        <div className="w-full bg-gray-800 h-[2px]">
          <div className="bg-amethyst h-full w-[100%] relative overflow-hidden">
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-mono text-gray-500">
          <span>ENCRYPTION: ACTIVE</span>
          <span>READY FOR INTAKE</span>
        </div>
      </div>
    </div>
  );
}