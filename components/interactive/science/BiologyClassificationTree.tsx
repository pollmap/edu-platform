'use client';

// S5-LI-01 다양한 생물 — 생물 분류 트리.
// 5계 (식물·동물·균·원생생물·세균) 중심 간단 분류 + 예시 생물 + 위키백과 요약.

import { useState } from 'react';
import { BIOLOGY, findWiki } from '@/lib/data/wikipedia';
import { WikipediaInfobox } from '@/components/primitives/WikipediaInfobox';

interface TaxonNode {
  id: string;
  label: string;
  level: 'kingdom' | 'group' | 'example';
  examples?: string[];
  children?: TaxonNode[];
}

const TREE: TaxonNode = {
  id: 'life',
  label: '생물',
  level: 'kingdom',
  children: [
    {
      id: 'plants',
      label: '식물계',
      level: 'kingdom',
      children: [
        {
          id: 'flowering',
          label: '꽃이 피는 식물',
          level: 'group',
          examples: ['벚꽃', '민들레', '벼'],
        },
        {
          id: 'nonflowering',
          label: '꽃이 피지 않는 식물',
          level: 'group',
          examples: ['고사리', '솔이끼', '소나무(겉씨식물)'],
        },
      ],
    },
    {
      id: 'animals',
      label: '동물계',
      level: 'kingdom',
      children: [
        {
          id: 'vertebrate',
          label: '척추동물',
          level: 'group',
          examples: ['개', '비둘기', '도마뱀', '개구리', '연어'],
        },
        {
          id: 'invertebrate',
          label: '무척추동물',
          level: 'group',
          examples: ['지렁이', '거미', '잠자리', '문어'],
        },
      ],
    },
    {
      id: 'fungi',
      label: '균계',
      level: 'kingdom',
      examples: ['버섯', '곰팡이', '효모'],
    },
    {
      id: 'protists',
      label: '원생생물계',
      level: 'kingdom',
      examples: ['아메바', '짚신벌레', '미역'],
    },
    {
      id: 'bacteria',
      label: '세균계',
      level: 'kingdom',
      examples: ['대장균', '젖산균'],
    },
  ],
};

export function BiologyClassificationTree() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['life', 'plants', 'animals']));
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          생물 분류 트리
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          모든 생물은 비슷한 특징끼리 묶어 5개의 큰 무리(<strong>5계</strong>)로 나눠요. 가지를 펼쳐 보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <NodeView
            node={TREE}
            depth={0}
            expanded={expanded}
            onToggle={toggle}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        {selected && (() => {
          const node = findNode(TREE, selected);
          if (!node || node.level !== 'kingdom' || node.id === 'life') return null;
          const w = findWiki(BIOLOGY, node.label);
          return w ? <WikipediaInfobox data={w} /> : null;
        })()}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
        위키백과 요약: CC BY-SA 3.0 (ko.wikipedia.org)
      </p>
    </div>
  );
}

function findNode(node: TaxonNode, id: string): TaxonNode | undefined {
  if (node.id === id) return node;
  for (const c of node.children ?? []) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return undefined;
}

function NodeView({
  node, depth, expanded, onToggle, selected, onSelect,
}: {
  node: TaxonNode; depth: number; expanded: Set<string>; onToggle: (id: string) => void;
  selected: string | null; onSelect: (id: string) => void;
}) {
  const isOpen = expanded.has(node.id);
  const hasChildren = !!node.children?.length;

  const colorByLevel: Record<TaxonNode['level'], string> = {
    kingdom: 'bg-green-50 dark:bg-green-950/30 border-green-400',
    group: 'bg-blue-50 dark:bg-blue-950/30 border-blue-400',
    example: 'bg-zinc-50 dark:bg-zinc-800/30 border-zinc-300 dark:border-zinc-600',
  };

  return (
    <div className={depth > 0 ? 'ml-4 mt-1.5' : ''}>
      <button
        type="button"
        onClick={() => {
          onSelect(node.id);
          if (hasChildren) onToggle(node.id);
        }}
        className={`w-full text-left px-3 py-2 rounded-lg border-l-4 ${colorByLevel[node.level]} ${
          selected === node.id ? 'ring-2 ring-blue-400' : ''
        } min-h-[40px] flex items-center gap-2`}
      >
        {hasChildren && (
          <span className="text-xs text-zinc-500 w-4">{isOpen ? '▼' : '▶'}</span>
        )}
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{node.label}</span>
        {node.examples && (
          <span className="text-xs text-zinc-500 ml-auto">
            예: {node.examples.slice(0, 3).join(', ')}{node.examples.length > 3 ? '...' : ''}
          </span>
        )}
      </button>
      {selected === node.id && node.examples && (
        <div className="ml-4 mt-1 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 bg-amber-50 dark:bg-amber-950/30 rounded-md">
          전체 예시: {node.examples.join(' · ')}
        </div>
      )}
      {isOpen && node.children?.map((c) => (
        <NodeView
          key={c.id}
          node={c}
          depth={depth + 1}
          expanded={expanded}
          onToggle={onToggle}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
