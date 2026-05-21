'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { buildDailyConceptQueue, type LearningProgressSnapshot, type LearningUnitSummary } from '@/lib/learning';
import { useProgress } from '@/lib/progress';
import { SUBJECT_LABEL, SUBJECT_TAILWIND } from '@/lib/types';

interface TodayConceptQueueProps {
  units: LearningUnitSummary[];
  totalUnits: number;
}

const STUDY_AMOUNTS = ['3분', '5분', '10분', '자유 학습'] as const;

export function TodayConceptQueue({ units, totalUnits }: TodayConceptQueueProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);
  const [studyAmount, setStudyAmount] = useState<(typeof STUDY_AMOUNTS)[number]>('3분');
  const visited = useProgress((s) => s.visited);
  const completed = useProgress((s) => s.completed);
  const favorites = useProgress((s) => s.favorites);
  const reviewQueue = useProgress((s) => s.reviewQueue);
  const streak = useProgress((s) => s.streak);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
  }, []);

  const snapshot: LearningProgressSnapshot = useMemo(
    () => ({
      visited,
      completed,
      favorites,
      reviewQueue: reviewQueue ?? {},
      streak: streak ?? { current: 0 },
    }),
    [completed, favorites, reviewQueue, streak, visited],
  );

  const queue = useMemo(
    () => buildDailyConceptQueue(units, snapshot, now || Date.now()),
    [now, snapshot, units],
  );

  if (!mounted) {
    return (
      <section className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-5 w-40 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-4 h-28 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      </section>
    );
  }

  const dueReviewCount = queue.review.length;
  const active = queue.review[0] ?? queue.continueUnit ?? queue.newConcept;
  const completedCount = Object.keys(completed).length;
  const completionPct = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 1000) / 10 : 0;

  return (
    <section
      aria-labelledby="today-concept-heading"
      className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="border-b border-zinc-200 p-5 dark:border-zinc-800 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Daily concept queue
              </p>
              <h2 id="today-concept-heading" className="mt-1 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                오늘의 3분 개념
              </h2>
            </div>
            <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {queue.totalCards}개 카드
            </div>
          </div>

          {active ? <TodayConceptCard unit={active} reviewFirst={dueReviewCount > 0} /> : <EmptyQueueCard />}
        </div>

        <div className="space-y-4 p-5">
          <StudyAmountSelector value={studyAmount} onChange={setStudyAmount} />
          <div className="grid grid-cols-3 gap-2">
            <Metric label="복습 큐" value={`${dueReviewCount}`} />
            <Metric label="연속 탐구" value={`${streak?.current ?? 0}일`} />
            <Metric label="완료율" value={`${completionPct}%`} />
          </div>
          <ReviewQueueCard units={queue.review} />
          <Link
            href="/grade-3"
            className="block min-h-[44px] rounded-lg border border-zinc-200 px-4 py-3 text-center text-sm font-semibold text-zinc-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
          >
            추가 학습 열기
          </Link>
        </div>
      </div>
    </section>
  );
}

function TodayConceptCard({ unit, reviewFirst }: { unit: LearningUnitSummary; reviewFirst: boolean }) {
  const tw = SUBJECT_TAILWIND[unit.subject];
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-1 text-xs font-bold ${tw.bg} ${tw.text}`}>
          {SUBJECT_LABEL[unit.subject]}
        </span>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
          {unit.gradeLabel}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{reviewFirst ? '복습 먼저' : unit.domain}</span>
      </div>
      <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{unit.title}</h3>
      <p className="mt-1 min-h-5 text-sm text-zinc-600 dark:text-zinc-300">
        {unit.interactiveTitle || '개념 카드와 인터랙티브 조작으로 빠르게 확인합니다.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={unit.href}
          className="min-h-[44px] rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          바로 시작
        </Link>
        <Link
          href="/grade-3"
          className="min-h-[44px] rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          전체 탐색
        </Link>
      </div>
    </div>
  );
}

function EmptyQueueCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300">
      오늘 큐를 만들 단원이 없습니다. 전체 탐색에서 새 단원을 열어 학습을 시작하세요.
    </div>
  );
}

function StudyAmountSelector({
  value,
  onChange,
}: {
  value: (typeof STUDY_AMOUNTS)[number];
  onChange: (value: (typeof STUDY_AMOUNTS)[number]) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">학습량</div>
      <div className="grid grid-cols-2 gap-2">
        {STUDY_AMOUNTS.map((amount) => {
          const active = value === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onChange(amount)}
              className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                active
                  ? 'border-blue-700 bg-blue-700 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30'
              }`}
              aria-pressed={active}
            >
              {amount}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3 text-center ring-1 ring-zinc-200 dark:bg-zinc-950/40 dark:ring-zinc-800">
      <div className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{value}</div>
      <div className="mt-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}

function ReviewQueueCard({ units }: { units: LearningUnitSummary[] }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">다시 볼 개념</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{units.length}개</div>
      </div>
      {units.length > 0 ? (
        <div className="space-y-1">
          {units.slice(0, 3).map((unit) => (
            <Link
              key={unit.id}
              href={unit.href}
              className="block rounded-md px-2 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <span className="font-mono text-zinc-500">{unit.id}</span> {unit.title}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">헷갈린 단원이 생기면 여기에 쌓입니다.</p>
      )}
    </div>
  );
}
