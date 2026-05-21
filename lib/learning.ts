import type { Priority, Subject } from './types';

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export type SelfCheckRating = 'understood' | 'confused' | 'review';
export type ReviewReason = 'confused' | 'review';

export interface ReviewQueueEntry {
  reason: ReviewReason;
  dueAt: number;
  updatedAt: number;
}

export interface StudyStreak {
  current: number;
  lastStudiedOn?: string;
}

export interface LearningProgressSnapshot {
  visited: Record<string, number>;
  completed: Record<string, number>;
  favorites: Record<string, true>;
  reviewQueue: Record<string, ReviewQueueEntry>;
  streak: StudyStreak;
}

export interface LearningUnitSummary {
  id: string;
  title: string;
  subject: Subject;
  gradeLabel: string;
  domain: string;
  href: string;
  priority: Priority;
  interactiveTitle?: string;
}

export interface DailyConceptQueue {
  review: LearningUnitSummary[];
  continueUnit?: LearningUnitSummary;
  newConcept?: LearningUnitSummary;
  totalCards: number;
}

export function kstDayKey(timestamp: number): string {
  return new Date(timestamp + KST_OFFSET_MS).toISOString().slice(0, 10);
}

function nextStreak(streak: StudyStreak, now: number): StudyStreak {
  const today = kstDayKey(now);
  if (streak.lastStudiedOn === today) return streak;

  const yesterday = kstDayKey(now - DAY_MS);
  const current = streak.lastStudiedOn === yesterday ? streak.current + 1 : 1;
  return { current, lastStudiedOn: today };
}

function dueForRating(rating: SelfCheckRating, now: number): number {
  return rating === 'confused' ? now + DAY_MS : now;
}

export function applySelfCheck(
  snapshot: LearningProgressSnapshot,
  unitId: string,
  rating: SelfCheckRating,
  now = Date.now(),
): LearningProgressSnapshot {
  const visited = { ...snapshot.visited, [unitId]: now };
  const reviewQueue = { ...snapshot.reviewQueue };
  const completed = { ...snapshot.completed };

  if (rating === 'understood') {
    completed[unitId] = now;
    delete reviewQueue[unitId];
  } else {
    delete completed[unitId];
    reviewQueue[unitId] = {
      reason: rating,
      dueAt: dueForRating(rating, now),
      updatedAt: now,
    };
  }

  return {
    ...snapshot,
    visited,
    completed,
    reviewQueue,
    streak: nextStreak(snapshot.streak, now),
  };
}

export function buildDailyConceptQueue(
  units: LearningUnitSummary[],
  snapshot: LearningProgressSnapshot,
  now = Date.now(),
): DailyConceptQueue {
  const unitById = new Map(units.map((u) => [u.id, u]));
  const review = Object.entries(snapshot.reviewQueue)
    .filter(([, entry]) => entry.dueAt <= now)
    .sort((a, b) => a[1].dueAt - b[1].dueAt || b[1].updatedAt - a[1].updatedAt)
    .map(([id]) => unitById.get(id))
    .filter((u): u is LearningUnitSummary => Boolean(u));

  const blockedIds = new Set(review.map((u) => u.id));
  const continueUnit = Object.entries(snapshot.visited)
    .filter(([id]) => !snapshot.completed[id] && !blockedIds.has(id))
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => unitById.get(id))
    .find((u): u is LearningUnitSummary => Boolean(u));

  const seenIds = new Set([
    ...Object.keys(snapshot.visited),
    ...Object.keys(snapshot.completed),
    ...Object.keys(snapshot.reviewQueue),
  ]);
  const newConcept =
    units.find((u) => u.priority === 'P0' && !seenIds.has(u.id)) ??
    units.find((u) => !seenIds.has(u.id));

  return {
    review,
    continueUnit,
    newConcept,
    totalCards: review.length + (continueUnit ? 1 : 0) + (newConcept ? 1 : 0),
  };
}
