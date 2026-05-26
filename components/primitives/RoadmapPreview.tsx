import Link from 'next/link';
import { buildRoadmapPreview, type RoadmapNode } from '@/lib/roadmap';
import type { HighSchoolUnit, Unit } from '@/lib/types';

interface RoadmapPreviewProps {
  unit: Unit | HighSchoolUnit;
  nextUnitIds?: string[];
  className?: string;
}

const ROADMAP_LANES: Array<{
  key: 'prerequisites' | 'next';
  title: string;
  empty: string;
}> = [
  {
    key: 'prerequisites',
    title: '먼저 알면 좋은 개념',
    empty: '등록된 선수 개념 없이 바로 시작할 수 있습니다.',
  },
  {
    key: 'next',
    title: '다음에 이어질 개념',
    empty: '현재 경로의 마지막 단원입니다. 검색으로 다른 개념을 이어서 열 수 있습니다.',
  },
];

export function RoadmapPreview({ unit, nextUnitIds, className = '' }: RoadmapPreviewProps) {
  const model = buildRoadmapPreview(unit, { nextUnitIds });
  const headingId = `roadmap-preview-${unit.id}`;

  return (
    <section
      aria-labelledby={headingId}
      data-testid="roadmap-preview"
      className={`mb-5 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">
            Roadmap preview
          </div>
          <h2 id={headingId} className="mt-1 text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
            학습 경로 미리보기
          </h2>
        </div>
        <div className="rounded-md bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
          실제 단원 메타데이터 기반
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <RoadmapLane
          title={ROADMAP_LANES[0].title}
          empty={ROADMAP_LANES[0].empty}
          nodes={model.prerequisites}
        />

        <div className="flex items-stretch lg:min-w-[220px]">
          <div className="flex w-full flex-col justify-center rounded-lg border border-blue-200 bg-blue-50 p-3 text-center dark:border-blue-900 dark:bg-blue-950/30">
            <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">현재 단원</div>
            <NodeCard node={model.current} current />
          </div>
        </div>

        <RoadmapLane
          title={ROADMAP_LANES[1].title}
          empty={ROADMAP_LANES[1].empty}
          nodes={model.next}
        />
      </div>

      {model.missingIds.length > 0 ? (
        <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
          일부 연결 단원은 아직 앱 메타데이터에서 찾지 못했습니다: {model.missingIds.join(', ')}
        </p>
      ) : null}
    </section>
  );
}

function RoadmapLane({
  title,
  empty,
  nodes,
}: {
  title: string;
  empty: string;
  nodes: RoadmapNode[];
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 text-sm font-extrabold text-zinc-950 dark:text-zinc-50">{title}</div>
      {nodes.length > 0 ? (
        <div className="space-y-2">
          {nodes.map((node) => (
            <NodeCard key={`${node.role}-${node.id}`} node={node} />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{empty}</p>
      )}
    </div>
  );
}

function NodeCard({ node, current = false }: { node: RoadmapNode; current?: boolean }) {
  const className = current
    ? 'mt-2 block rounded-md bg-white px-3 py-3 text-left ring-1 ring-blue-200 dark:bg-zinc-950 dark:ring-blue-900'
    : 'block rounded-md bg-white px-3 py-2 text-left ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800';
  const content = (
    <>
      <span className="block font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
        {node.id}
      </span>
      <span className="mt-0.5 block text-sm font-bold text-zinc-950 dark:text-zinc-50">
        {node.title}
      </span>
      {node.domain ? (
        <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{node.domain}</span>
      ) : null}
    </>
  );

  if (!node.available || !node.href) {
    return (
      <div className={`${className} opacity-70`} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={node.href} className={`${className} transition hover:ring-blue-300 dark:hover:ring-blue-700`}>
      {content}
    </Link>
  );
}
