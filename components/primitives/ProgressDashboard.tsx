'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LearningUnitSummary, ReviewQueueEntry } from '@/lib/learning';
import { useProgress } from '@/lib/progress';
import { SUBJECT_LABEL, SUBJECT_TAILWIND, type Subject } from '@/lib/types';

interface ProgressDashboardProps {
  units: LearningUnitSummary[];
  totalUnits: number;
}

interface UnitLinkListProps {
  emptyText: string;
  ids: string[];
  title: string;
  unitById: Map<string, LearningUnitSummary>;
}

const SUBJECT_ORDER: Subject[] = ['math', 'science', 'korean', 'english', 'social'];

const DATE_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
  timeZone: 'Asia/Seoul',
});

export function ProgressDashboard({ units, totalUnits }: ProgressDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const visited = useProgress((state) => state.visited);
  const completed = useProgress((state) => state.completed);
  const favorites = useProgress((state) => state.favorites);
  const reviewQueue = useProgress((state) => state.reviewQueue);
  const streak = useProgress((state) => state.streak);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unitById = useMemo(() => new Map(units.map((unit) => [unit.id, unit])), [units]);

  const model = useMemo(() => {
    const completedIds = new Set(Object.keys(completed));
    const visitedIds = new Set(Object.keys(visited));
    const reviewEntries = Object.entries(reviewQueue ?? {}).sort(
      (a, b) => a[1].dueAt - b[1].dueAt || b[1].updatedAt - a[1].updatedAt,
    );
    const reviewIds = reviewEntries.map(([id]) => id);
    const reviewIdSet = new Set(reviewIds);

    const continueIds = Object.entries(visited)
      .filter(([id]) => !completedIds.has(id) && !reviewIdSet.has(id))
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    const recentCompletedIds = Object.entries(completed)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    const favoriteIds = Object.keys(favorites).filter((id) => unitById.has(id));

    const subjectRows = SUBJECT_ORDER.map((subject) => {
      const subjectUnits = units.filter((unit) => unit.subject === subject);
      const subjectCompleted = subjectUnits.filter((unit) => completedIds.has(unit.id)).length;
      const subjectVisited = subjectUnits.filter((unit) => visitedIds.has(unit.id)).length;
      const pct = subjectUnits.length > 0 ? (subjectCompleted / subjectUnits.length) * 100 : 0;

      return {
        subject,
        completed: subjectCompleted,
        visited: subjectVisited,
        total: subjectUnits.length,
        pct,
      };
    });

    return {
      completedCount: completedIds.size,
      visitedCount: visitedIds.size,
      reviewCount: reviewIds.length,
      reviewEntries,
      reviewIds,
      continueIds,
      recentCompletedIds,
      favoriteIds,
      subjectRows,
    };
  }, [completed, favorites, reviewQueue, unitById, units, visited]);

  if (!mounted) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-6 w-44 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
          ))}
        </div>
      </section>
    );
  }

  const completionPct = totalUnits > 0 ? Math.min(100, (model.completedCount / totalUnits) * 100) : 0;
  const activeReview = model.reviewEntries[0];
  const firstReviewHref = firstKnownHref(model.reviewIds, unitById);
  const firstReviewTitle = firstKnownTitle(model.reviewIds, unitById);

  return (
    <section
      aria-labelledby="progress-dashboard-heading"
      data-testid="progress-dashboard"
      className="space-y-6"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
              Progress dashboard
            </p>
            <h1 id="progress-dashboard-heading" className="mt-1 text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">
              학습 현황
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              완료, 복습 큐, 즐겨찾기를 한 곳에서 확인하고 다음 학습으로 바로 이어갑니다.
            </p>
          </div>
          <Link
            href="/"
            className="min-h-[44px] rounded-lg border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
          >
            오늘 큐로 돌아가기
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <MetricCard label="완료한 단원" value={`${model.completedCount}`} sub={`${totalUnits}개 중`} />
          <MetricCard label="방문한 단원" value={`${model.visitedCount}`} sub="학습 흔적" />
          <MetricCard label="복습 큐" value={`${model.reviewCount}`} sub={activeReview ? dueLabel(activeReview[1]) : '대기 없음'} />
          <MetricCard label="연속 탐구" value={`${streak?.current ?? 0}일`} sub="KST 기준" />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">전체 완료율</span>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{completionPct.toFixed(1)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all"
              style={{ width: `${completionPct}%` }}
              aria-label={`전체 ${totalUnits}단원 중 ${model.completedCount}단원 완료`}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">과목별 진도</h2>
          <div className="mt-4 space-y-3">
            {model.subjectRows.map((row) => (
              <SubjectProgressRow key={row.subject} row={row} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">다음 행동</h2>
          <div className="mt-4 space-y-3">
            <ActionPanel
              href={firstReviewHref ?? '/'}
              label="복습 먼저"
              title={firstReviewTitle ?? '복습 큐가 비어 있습니다'}
              description={firstReviewHref ? `${model.reviewCount}개 개념을 다시 확인할 차례입니다.` : '헷갈린 개념이 생기면 여기에 모입니다.'}
              disabled={!firstReviewHref}
            />
            <ActionPanel
              href={firstKnownHref(model.continueIds, unitById) ?? '/grade-3'}
              label="이어하기"
              title={firstKnownTitle(model.continueIds, unitById) ?? '새 단원을 열어 학습을 시작하세요'}
              description={model.continueIds.length > 0 ? '방문했지만 아직 완료하지 않은 단원입니다.' : '오늘 큐나 전체 탐색에서 첫 단원을 고르면 됩니다.'}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <UnitLinkList
          title="복습 큐"
          ids={model.reviewIds}
          unitById={unitById}
          emptyText="다시 볼래요 또는 헷갈려요를 누른 단원이 쌓입니다."
        />
        <UnitLinkList
          title="즐겨찾기"
          ids={model.favoriteIds}
          unitById={unitById}
          emptyText="중요한 단원을 즐겨찾기하면 여기서 바로 찾을 수 있습니다."
        />
        <UnitLinkList
          title="최근 완료"
          ids={model.recentCompletedIds}
          unitById={unitById}
          emptyText="학습 완료로 표시한 단원이 최신순으로 나타납니다."
        />
      </div>
    </section>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
      <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">{label}</div>
      <div className="mt-2 text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">{value}</div>
      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{sub}</div>
    </div>
  );
}

function SubjectProgressRow({
  row,
}: {
  row: { completed: number; pct: number; subject: Subject; total: number; visited: number };
}) {
  const tw = SUBJECT_TAILWIND[row.subject];

  return (
    <div data-testid={`subject-progress-${row.subject}`} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-1 text-xs font-bold ${tw.bg} ${tw.text}`}>
            {SUBJECT_LABEL[row.subject]}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">방문 {row.visited}</span>
        </div>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {row.completed}/{row.total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full bg-zinc-950 transition-all dark:bg-zinc-50" style={{ width: `${row.pct}%` }} />
      </div>
    </div>
  );
}

function ActionPanel({
  description,
  disabled = false,
  href,
  label,
  title,
}: {
  description: string;
  disabled?: boolean;
  href: string;
  label: string;
  title: string;
}) {
  const className = `block rounded-xl border p-4 transition ${
    disabled
      ? 'border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
      : 'border-blue-200 bg-blue-50 text-blue-950 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/25 dark:text-blue-100 dark:hover:border-blue-700'
  }`;

  const content = (
    <>
      <div className="text-xs font-bold uppercase tracking-[0.12em]">{label}</div>
      <div className="mt-2 text-base font-extrabold">{title}</div>
      <p className="mt-1 text-sm leading-relaxed opacity-80">{description}</p>
    </>
  );

  if (disabled) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function UnitLinkList({ emptyText, ids, title, unitById }: UnitLinkListProps) {
  const items = ids
    .map((id) => unitById.get(id))
    .filter((unit): unit is LearningUnitSummary => Boolean(unit))
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-zinc-950 dark:text-zinc-50">{title}</h2>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((unit) => (
            <Link
              key={unit.id}
              href={unit.href}
              className="block rounded-lg border border-zinc-200 px-3 py-2 transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <span className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{unit.id}</span>
              <span className="mt-0.5 block text-sm font-bold text-zinc-950 dark:text-zinc-50">{unit.title}</span>
              <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                {SUBJECT_LABEL[unit.subject]} · {unit.gradeLabel} · {unit.domain}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{emptyText}</p>
      )}
    </div>
  );
}

function dueLabel(entry: ReviewQueueEntry): string {
  const today = Date.now();
  if (entry.dueAt <= today) return '오늘 복습';
  return `${DATE_FORMATTER.format(entry.dueAt)} 예정`;
}

function firstKnownHref(ids: string[], unitById: Map<string, LearningUnitSummary>): string | undefined {
  return ids.map((id) => unitById.get(id)?.href).find(Boolean);
}

function firstKnownTitle(ids: string[], unitById: Map<string, LearningUnitSummary>): string | undefined {
  return ids.map((id) => unitById.get(id)?.title).find(Boolean);
}
