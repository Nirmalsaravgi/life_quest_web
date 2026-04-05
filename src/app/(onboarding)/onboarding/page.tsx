'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile, useArchetypes, useLifeModes } from '@/modules/profile/hooks/useProfile';
import { onboardingAction } from '@/modules/profile/actions';
import { OnboardingRequest, Archetype, LifeMode } from '@/modules/profile/types';

// Validation schema for onboarding
const onboardingSchema = z.object({
  player_name: z
    .string()
    .min(3, 'Designation must be at least 3 characters')
    .max(20, 'Designation must be at most 20 characters')
    .regex(/^[A-Z0-9_]+$/i, 'Only letters, numbers, and underscores allowed'),
  archetype_id: z.string().min(1, 'Select an archetype'),
  life_mode_id: z.string().min(1, 'Select a life mode'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

// Icon mapping for archetypes
const archetypeIcons: Record<string, string> = {
  explorer: '🧭',
  builder: '🔨',
  strategist: '🧠',
  warrior: '🛡️',
  sage: '📚',
};

const archetypeStats: Record<string, string> = {
  explorer: 'AGILITY',
  builder: 'ENDURANCE',
  strategist: 'INTELLECT',
  warrior: 'STRENGTH',
  sage: 'WISDOM',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile to check if already onboarded
  const { data: profile, isLoading: profileLoading } = useProfile();
  
  // Fetch archetypes and life modes from API
  const { data: archetypes, isLoading: archetypesLoading } = useArchetypes();
  const { data: lifeModes, isLoading: lifeModesLoading } = useLifeModes();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      player_name: '',
      archetype_id: '',
      life_mode_id: '',
    },
  });

  // Redirect if user already has a profile
  useEffect(() => {
    if (!profileLoading && profile?.onboarding_completed) {
      router.replace('/dashboard');
    }
  }, [profile, profileLoading, router]);

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    setError(null);

    const requestData: OnboardingRequest = {
      ...data,
      life_area_ids: [], // Will be expanded later
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const result = await onboardingAction(requestData);

    if (result?.success === false) {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  const isLoading = profileLoading || archetypesLoading || lifeModesLoading;

  if (isLoading) {
    return (
      <div className="h-screen bg-obsidian flex items-center justify-center">
        <div className="text-center">
          <div className="core-wrapper w-24 h-24 mx-auto mb-4">
            <div className="core-inner animate-pulse-fast" />
          </div>
          <p className="text-ember font-mono text-sm tracking-widest animate-pulse">
            LOADING_SYSTEM_DATA...
          </p>
        </div>
      </div>
    );
  }

  if (profile?.onboarding_completed) {
    return null;
  }

  return (
    <div className="h-screen bg-obsidian text-gray-300 font-tech overflow-hidden selection:bg-ember selection:text-white flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanline-overlay opacity-20 z-50" />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-[0.05]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amethyst/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Header - Fixed */}
      <header className="shrink-0 z-40 w-full border-b border-white/5 bg-obsidian/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-ember relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </div>
            <h1 className="text-lg font-display font-bold tracking-[0.1em] text-white leading-none">
              RENMA
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-gray-500 font-mono hidden sm:block">
              SECURE_CONNECTION_ACTIVE
            </span>
            <span className="h-2 w-2 rounded-full bg-success-neon animate-pulse shadow-[0_0_5px_#4ade80]" />
          </div>
        </div>
      </header>

      {/* Main Content - Fills remaining space */}
      <main className="flex-1 flex items-center justify-center relative z-10 overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-7xl h-full max-h-[calc(100vh-8rem)] bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/5 relative flex flex-col shadow-2xl"
        >
          {/* HUD Corner Decorations - Always visible */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-ember z-20" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-ember z-20" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-ember z-20" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-ember z-20" />

          {/* Header Section - Fixed at top of form */}
          <div className="shrink-0 px-6 pt-5 pb-4 border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className="w-3 h-3 text-ember animate-spin-slow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-[10px] text-ember font-mono tracking-widest">
                    SYSTEM_INITIALIZATION
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-widest">
                  BOOTING_IDENTITY_
                  <span className="text-ember animate-pulse">PROTOCOL</span>
                </h2>
              </div>
              <div className="flex flex-col items-end text-[10px]">
                <div className="flex items-center gap-2 font-mono text-gray-500">
                  <span>CPU_LOAD</span>
                  <div className="w-16 h-1 bg-gray-800">
                    <div className="h-full bg-ember w-[35%] animate-pulse" />
                  </div>
                  <span className="text-ember">35%</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-gray-500 mt-1">
                  <span>MEMORY_ALLOC</span>
                  <div className="w-16 h-1 bg-gray-800">
                    <div className="h-full bg-amethyst w-[62%]" />
                  </div>
                  <span className="text-amethyst">62%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="shrink-0 mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
              <span className="text-red-500">[ERROR]</span> {error}
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Agent Name & Core Visualization */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Agent Name Input */}
                <div className="relative group">
                  <label className="text-ember text-[10px] font-mono tracking-[0.2em] mb-2 block flex justify-between">
                    <span>// ENTER AGENT_NAME</span>
                    <span className="text-success-neon opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                      READY
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('player_name')}
                      className="w-full bg-black/50 border-2 border-white/10 text-white font-mono text-lg p-3 pl-4 focus:ring-0 focus:border-ember focus:shadow-[0_0_15px_rgba(255,95,31,0.3)] transition-all duration-300 placeholder-gray-700 uppercase tracking-wider"
                      placeholder="DESIGNATION_REQUIRED"
                      autoComplete="off"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-success-neon shadow-[0_0_8px_#4ade80] opacity-50 group-focus-within:opacity-100 transition-all" />
                    <div className="absolute left-0 bottom-0 h-2 w-[2px] bg-ember" />
                    <div className="absolute left-0 top-0 h-2 w-[2px] bg-ember" />
                  </div>
                  {errors.player_name && (
                    <p className="text-red-400 text-[10px] font-mono mt-1">
                      {errors.player_name.message}
                    </p>
                  )}
                  <p className="text-[9px] text-gray-600 mt-1 font-mono">
                    * Unique identifier for the Renma network.
                  </p>
                </div>

                {/* Core Visualization */}
                <div className="flex-grow min-h-[200px] border border-white/5 bg-black/20 relative flex items-center justify-center overflow-hidden rounded-sm group hover:border-ember/20 transition-colors">
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-600">
                    CORE_VISUALIZATION
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-gray-600">
                    RENDER_MODE: WIREFRAME
                  </div>
                  <div className="core-wrapper transform scale-50 md:scale-75">
                    <div className="core-inner animate-pulse-fast" />
                    <div className="absolute w-40 h-40 border border-ember/60 rounded-full animate-spin-slow opacity-80 border-t-transparent border-l-transparent" />
                    <div className="absolute w-56 h-56 border border-dashed border-amethyst/40 rounded-full animate-spin-reverse-slow" />
                    <div
                      className="absolute w-72 h-72 border border-ember/20 rounded-full animate-spin-slow"
                      style={{ animationDuration: '30s' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Archetype Selection */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-display text-xs tracking-widest flex items-center gap-2">
                    <span className="w-1 h-3 bg-ember" />
                    SELECT ARCHETYPE
                  </h3>
                  <span className="text-[9px] text-gray-500 font-mono border border-white/10 px-2 py-0.5 rounded">
                    1 OF {archetypes?.length || 5} REQUIRED
                  </span>
                </div>

                {/* Archetypes Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {archetypes?.map((archetype: Archetype) => (
                    <div key={archetype.id} className="relative">
                      <input
                        type="radio"
                        id={`arch_${archetype.id}`}
                        value={archetype.id}
                        {...register('archetype_id')}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`arch_${archetype.id}`}
                        className="block h-full cursor-pointer bg-white/5 border border-white/10 p-3 hover:bg-white/10 hover:border-ember/50 transition-all duration-300 backdrop-blur-md flex flex-col gap-2 group peer-checked:border-ember peer-checked:bg-ember/10"
                      >
                        <div className="w-8 h-8 border border-gray-600 flex items-center justify-center text-xl group-hover:border-white transition-all">
                          {archetypeIcons[archetype.name.toLowerCase()] || '⚡'}
                        </div>
                        <div>
                          <h4 className="text-white font-bold font-display text-sm tracking-wide group-hover:text-ember transition-colors">
                            {archetype.name.toUpperCase()}
                          </h4>
                          <p className="text-[9px] text-gray-500 font-mono">
                            Core: {archetypeStats[archetype.name.toLowerCase()] || 'POWER'}
                          </p>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-tight mt-auto pt-2 border-t border-white/5">
                          {archetype.description}
                        </p>
                        <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-success-neon opacity-0 peer-checked:opacity-100 shadow-[0_0_5px_#4ade80]" />
                      </label>
                    </div>
                  ))}
                </div>
                {errors.archetype_id && (
                  <p className="text-red-400 text-[10px] font-mono mt-2">
                    {errors.archetype_id.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Fixed at bottom of form */}
          <div className="shrink-0 px-6 py-4 border-t border-white/10 bg-[#0f0f0f]/95 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Life Mode Selection */}
            <div>
              <h3 className="text-gray-500 font-mono text-[9px] tracking-[0.2em] uppercase mb-2">
                Initialize Life Mode
              </h3>
              <div className="flex gap-2">
                {lifeModes?.map((mode: LifeMode) => (
                  <label key={mode.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={mode.id}
                      {...register('life_mode_id')}
                      className="peer hidden"
                    />
                    <span className="block px-4 py-2 border border-gray-700 bg-black/40 text-gray-400 font-bold font-tech uppercase text-xs peer-checked:border-amethyst peer-checked:text-amethyst peer-checked:shadow-[0_0_15px_rgba(157,78,221,0.2)] hover:border-amethyst/50 hover:text-white transition-all btn-clip text-center">
                      {mode.name}
                    </span>
                  </label>
                ))}
              </div>
              {errors.life_mode_id && (
                <p className="text-red-400 text-[9px] font-mono mt-1">
                  {errors.life_mode_id.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative group bg-ember text-black font-bold h-12 px-8 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,95,31,0.4)] btn-clip disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="flex items-center justify-center gap-2 relative z-10 font-display tracking-widest text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
                </svg>
                <span>{isSubmitting ? 'GENERATING...' : 'GENERATE IDENTITY'}</span>
              </div>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}