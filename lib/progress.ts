'use client';

// Sprint 11 — 진도 트래커.
// zustand + persist(localStorage). 단원 완료/즐겨찾기 상태.
// Plan v2 D6: zustand 도입은 Sprint 11 부터.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  applySelfCheck,
  type ReviewQueueEntry,
  type SelfCheckRating,
  type StudyStreak,
} from './learning';

export type UnitStatus = 'unseen' | 'visited' | 'completed';

export interface ProgressState {
  visited: Record<string, number>;
  completed: Record<string, number>;
  favorites: Record<string, true>;
  reviewQueue: Record<string, ReviewQueueEntry>;
  streak: StudyStreak;
  markVisited: (unitId: string) => void;
  markCompleted: (unitId: string) => void;
  unmarkCompleted: (unitId: string) => void;
  toggleFavorite: (unitId: string) => void;
  setSelfCheck: (unitId: string, rating: SelfCheckRating) => void;
  clearReview: (unitId: string) => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      visited: {},
      completed: {},
      favorites: {},
      reviewQueue: {},
      streak: { current: 0 },

      markVisited: (unitId) =>
        set((s) => ({
          visited: { ...s.visited, [unitId]: Date.now() },
        })),

      markCompleted: (unitId) =>
        set((s) =>
          applySelfCheck(
            {
              visited: s.visited,
              completed: s.completed,
              favorites: s.favorites,
              reviewQueue: s.reviewQueue ?? {},
              streak: s.streak ?? { current: 0 },
            },
            unitId,
            'understood',
          ),
        ),

      unmarkCompleted: (unitId) =>
        set((s) => {
          const { [unitId]: _, ...rest } = s.completed;
          return { completed: rest };
        }),

      toggleFavorite: (unitId) =>
        set((s) => {
          if (s.favorites[unitId]) {
            const { [unitId]: _, ...rest } = s.favorites;
            return { favorites: rest };
          }
          return { favorites: { ...s.favorites, [unitId]: true } };
        }),

      setSelfCheck: (unitId, rating) =>
        set((s) =>
          applySelfCheck(
            {
              visited: s.visited,
              completed: s.completed,
              favorites: s.favorites,
              reviewQueue: s.reviewQueue ?? {},
              streak: s.streak ?? { current: 0 },
            },
            unitId,
            rating,
          ),
        ),

      clearReview: (unitId) =>
        set((s) => {
          const { [unitId]: _, ...rest } = s.reviewQueue ?? {};
          return { reviewQueue: rest };
        }),

      reset: () =>
        set({
          visited: {},
          completed: {},
          favorites: {},
          reviewQueue: {},
          streak: { current: 0 },
        }),
    }),
    {
      name: 'edu-platform-progress',
      version: 1,
    },
  ),
);

export function unitStatus(s: ProgressState, unitId: string): UnitStatus {
  if (s.completed[unitId]) return 'completed';
  if (s.visited[unitId]) return 'visited';
  return 'unseen';
}

export function totalCounts(s: ProgressState): {
  completed: number;
  visited: number;
  favorites: number;
  reviews: number;
} {
  return {
    completed: Object.keys(s.completed).length,
    visited: Object.keys(s.visited).length,
    favorites: Object.keys(s.favorites).length,
    reviews: Object.keys(s.reviewQueue ?? {}).length,
  };
}
