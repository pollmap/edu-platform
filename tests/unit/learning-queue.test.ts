import { describe, expect, it } from 'vitest';
import {
  applySelfCheck,
  buildDailyConceptQueue,
  kstDayKey,
  type LearningProgressSnapshot,
  type LearningUnitSummary,
} from '@/lib/learning';

const NOW = Date.parse('2026-05-21T09:00:00+09:00');
const YESTERDAY = Date.parse('2026-05-20T09:00:00+09:00');
const TOMORROW = Date.parse('2026-05-22T09:00:00+09:00');

const units: LearningUnitSummary[] = [
  {
    id: 'M9-CR-03',
    title: '이차함수',
    subject: 'math',
    gradeLabel: '중3',
    domain: '변화와 관계',
    href: '/grade-9/math/M9-CR-03',
    priority: 'P0',
    interactiveTitle: '포물선 조작',
  },
  {
    id: 'S9-MA-02',
    title: '기체의 성질',
    subject: 'science',
    gradeLabel: '중3',
    domain: '물질',
    href: '/grade-9/science/S9-MA-02',
    priority: 'P0',
    interactiveTitle: '압력과 부피',
  },
  {
    id: 'K-GR-01',
    title: '한글 자모 체계',
    subject: 'korean',
    gradeLabel: '공통',
    domain: '문법',
    href: '/common/korean/K-GR-01',
    priority: 'P1',
    interactiveTitle: '자모 조합',
  },
  {
    id: 'E-GR-04',
    title: '시제',
    subject: 'english',
    gradeLabel: '공통',
    domain: '문법',
    href: '/common/english/E-GR-04',
    priority: 'P1',
    interactiveTitle: '시제 변환',
  },
];

function emptySnapshot(): LearningProgressSnapshot {
  return {
    visited: {},
    completed: {},
    favorites: {},
    reviewQueue: {},
    streak: { current: 0 },
  };
}

describe('kstDayKey', () => {
  it('formats timestamps as Korean study days', () => {
    expect(kstDayKey(NOW)).toBe('2026-05-21');
  });
});

describe('applySelfCheck', () => {
  it('understood completes the unit, clears review queue, and advances streak once per day', () => {
    const snapshot: LearningProgressSnapshot = {
      ...emptySnapshot(),
      completed: {},
      reviewQueue: {
        'M9-CR-03': {
          reason: 'confused',
          dueAt: NOW,
          updatedAt: YESTERDAY,
        },
      },
      streak: { current: 2, lastStudiedOn: '2026-05-20' },
    };

    const next = applySelfCheck(snapshot, 'M9-CR-03', 'understood', NOW);

    expect(next.completed['M9-CR-03']).toBe(NOW);
    expect(next.visited['M9-CR-03']).toBe(NOW);
    expect(next.reviewQueue['M9-CR-03']).toBeUndefined();
    expect(next.streak).toEqual({ current: 3, lastStudiedOn: '2026-05-21' });
  });

  it('confused schedules the concept for tomorrow without completing it', () => {
    const next = applySelfCheck(emptySnapshot(), 'S9-MA-02', 'confused', NOW);

    expect(next.completed['S9-MA-02']).toBeUndefined();
    expect(next.visited['S9-MA-02']).toBe(NOW);
    expect(next.reviewQueue['S9-MA-02']).toMatchObject({
      reason: 'confused',
      dueAt: TOMORROW,
      updatedAt: NOW,
    });
  });

  it('review stores the concept for the due review queue today', () => {
    const next = applySelfCheck(emptySnapshot(), 'K-GR-01', 'review', NOW);

    expect(next.completed['K-GR-01']).toBeUndefined();
    expect(next.reviewQueue['K-GR-01']).toMatchObject({
      reason: 'review',
      dueAt: NOW,
      updatedAt: NOW,
    });
  });
});

describe('buildDailyConceptQueue', () => {
  it('prioritizes due reviews, recent unfinished units, and one unseen priority concept', () => {
    const snapshot: LearningProgressSnapshot = {
      ...emptySnapshot(),
      visited: { 'S9-MA-02': YESTERDAY },
      reviewQueue: {
        'K-GR-01': { reason: 'confused', dueAt: NOW, updatedAt: YESTERDAY },
        'E-GR-04': { reason: 'review', dueAt: TOMORROW, updatedAt: NOW },
      },
    };

    const queue = buildDailyConceptQueue(units, snapshot, NOW);

    expect(queue.review.map((u) => u.id)).toEqual(['K-GR-01']);
    expect(queue.continueUnit?.id).toBe('S9-MA-02');
    expect(queue.newConcept?.id).toBe('M9-CR-03');
    expect(queue.totalCards).toBe(3);
  });
});
