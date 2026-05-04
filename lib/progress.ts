'use client';

// Sprint 11 — 진도 트래커.
// zustand + persist(localStorage). 단원 완료/즐겨찾기 상태.
// Plan v2 D6: zustand 도입은 Sprint 11 부터.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UnitStatus = 'unseen' | 'visited' | 'completed';

export interface ProgressState {
  visited: Record<string, number>;
  completed: Record<string, number>;
  favorites: Record<string, true>;
  markVisited: (unitId: string) => void;
  markCompleted: (unitId: string) => void;
  unmarkCompleted: (unitId: string) => void;
  toggleFavorite: (unitId: string) => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      visited: {},
      completed: {},
      favorites: {},

      markVisited: (unitId) =>
        set((s) => ({
          visited: { ...s.visited, [unitId]: Date.now() },
        })),

      markCompleted: (unitId) =>
        set((s) => ({
          completed: { ...s.completed, [unitId]: Date.now() },
          visited: { ...s.visited, [unitId]: s.visited[unitId] ?? Date.now() },
        })),

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

      reset: () => set({ visited: {}, completed: {}, favorites: {} }),
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
} {
  return {
    completed: Object.keys(s.completed).length,
    visited: Object.keys(s.visited).length,
    favorites: Object.keys(s.favorites).length,
  };
}
