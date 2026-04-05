// src/modules/profile/types.ts

export interface Profile {
  id: string;
  user_id: string;
  player_name: string;
  level: number;
  total_core_xp: number;
  avatar_url: string | null;
  bio: string | null;
  timezone: string;
  onboarding_completed: boolean;
  identity_locked_until: string | null;
  archetype: Archetype;
  life_mode: LifeMode;
  created_at: string;
}

export interface Archetype {
  id: string;
  name: string;
  description: string;
  passive_bonuses: Record<string, unknown>;
}

export interface LifeMode {
  id: string;
  name: string;
  description: string;
  modifiers: Record<string, unknown>;
}

export interface LifeArea {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface OnboardingRequest {
  player_name: string;
  archetype_id: string;
  life_mode_id: string;
  life_area_ids: string[];
  avatar_url?: string;
  bio?: string;
  timezone?: string;
}