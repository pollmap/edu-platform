'use client';

// K-RD-01 글의 구조 — 패턴 13 트리.
// 글의 종류 선택 → 서론·본론·결론 트리 + 토픽/뒷받침 문장 표시.

import { useState } from 'react';

interface TextNode {
  label: string;
  role: 'root' | 'section' | 'topic' | 'support';
  text?: string;
  children?: TextNode[];
}

interface SampleText {
  id: string;
  type: '설명문' | '논설문' | '서사문';
  title: string;
  tree: TextNode;
}

const SAMPLES: SampleText[] = [
  {
    id: 'expo-recycling',
    type: '설명문',
    title: '재활용은 왜 필요할까',
    tree: {
      label: '글 전체',
      role: 'root',
      children: [
        {
          label: '서론',
          role: 'section',
          children: [
            { label: '도입 문장', role: 'topic', text: '쓰레기 문제는 해마다 심해지고 있다.' },
          ],
        },
        {
          label: '본론',
          role: 'section',
          children: [
            { label: '주장 1', role: 'topic', text: '재활용은 자원을 아낀다.' },
            { label: '뒷받침', role: 'support', text: '플라스틱 1톤을 재활용하면 원유 약 5배럴이 절약된다.' },
            { label: '주장 2', role: 'topic', text: '재활용은 에너지를 줄인다.' },
            { label: '뒷받침', role: 'support', text: '알루미늄 캔 재활용은 새 캔 제조의 5%만 에너지를 쓴다.' },
          ],
        },
        {
          label: '결론',
          role: 'section',
          children: [
            { label: '요약·강조', role: 'topic', text: '작은 분리배출이 큰 변화를 만든다.' },
          ],
        },
      ],
    },
  },
  {
    id: 'arg-school-uniform',
    type: '논설문',
    title: '교복은 필요한가',
    tree: {
      label: '글 전체',
      role: 'root',
      children: [
        {
          label: '서론',
          role: 'section',
          children: [
            { label: '문제 제기', role: 'topic', text: '교복은 학생의 자유를 제한할까, 아니면 평등을 만들까?' },
          ],
        },
        {
          label: '본론',
          role: 'section',
          children: [
            { label: '근거 1', role: 'topic', text: '교복은 빈부 격차를 가린다.' },
            { label: '뒷받침', role: 'support', text: '자유복일 때 비싼 옷으로 위화감이 생기는 사례가 많다.' },
            { label: '근거 2', role: 'topic', text: '교복은 등교 준비 시간을 줄인다.' },
            { label: '뒷받침', role: 'support', text: '학부모 설문에서 옷 고르는 시간이 줄었다는 응답이 많다.' },
          ],
        },
        {
          label: '결론',
          role: 'section',
          children: [
            { label: '주장 정리', role: 'topic', text: '교복은 단점도 있지만 평등 측면의 장점이 더 크다.' },
          ],
        },
      ],
    },
  },
  {
    id: 'narr-lost-key',
    type: '서사문',
    title: '잃어버린 열쇠',
    tree: {
      label: '글 전체',
      role: 'root',
      children: [
        {
          label: '발단',
          role: 'section',
          children: [
            { label: '배경·인물', role: 'topic', text: '학교에서 돌아온 나는 가방에 열쇠가 없다는 걸 알았다.' },
          ],
        },
        {
          label: '전개·위기',
          role: 'section',
          children: [
            { label: '사건 1', role: 'topic', text: '엄마는 회의 중이라 전화를 못 받는다.' },
            { label: '사건 2', role: 'topic', text: '나는 학교에 다시 가서 자리·운동장을 살핀다.' },
          ],
        },
        {
          label: '결말',
          role: 'section',
          children: [
            { label: '해결', role: 'topic', text: '체육 시간에 들렀던 사물함 옆에서 열쇠를 찾았다.' },
          ],
        },
      ],
    },
  },
];

export function TextStructureTree() {
  const [sampleId, setSampleId] = useState(SAMPLES[0].id);
  const sample = SAMPLES.find((s) => s.id === sampleId) ?? SAMPLES[0];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          글 구조 분석기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          글은 <strong>큰 묶음(서론·본론·결론)</strong> 안에 <strong>토픽 문장</strong>이 있고, 그 아래 <strong>뒷받침 문장</strong>이 붙어요. 글 종류마다 묶음 이름이 달라집니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSampleId(s.id)}
            className={`px-3 py-2 rounded-md text-xs border-2 min-h-[40px] transition ${
              s.id === sampleId
                ? 'bg-red-600 text-white border-red-700'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span className="font-semibold">{s.type}</span> · {s.title}
          </button>
        ))}
      </div>

      <NodeRenderer node={sample.tree} depth={0} />
    </div>
  );
}

function NodeRenderer({ node, depth }: { node: TextNode; depth: number }) {
  const styles: Record<TextNode['role'], string> = {
    root: 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40',
    section: 'border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-700',
    topic: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-700',
    support: 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900',
  };
  return (
    <div
      className={`rounded-lg border-l-4 ${styles[node.role]} p-3 ${depth > 0 ? 'mt-2 ml-4' : ''}`}
    >
      <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">{node.label}</div>
      {node.text && (
        <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{node.text}</div>
      )}
      {node.children?.map((c, i) => (
        <NodeRenderer key={i} node={c} depth={depth + 1} />
      ))}
    </div>
  );
}
