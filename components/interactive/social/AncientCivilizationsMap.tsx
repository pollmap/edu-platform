'use client';

// H-HI-01 문명·고조선 — 4대 문명 + 고조선 위치/특징.

import { useState } from 'react';

interface Civilization {
  id: string;
  name: string;
  river: string;
  approxBCE: string;
  region: string;
  features: string[];
  cx: number;
  cy: number;
  color: string;
}

const CIVS: Civilization[] = [
  {
    id: 'mesopotamia',
    name: '메소포타미아 문명',
    river: '티그리스·유프라테스 강',
    approxBCE: '약 기원전 3500년경',
    region: '오늘날 이라크 부근',
    features: ['쐐기문자(설형문자) 사용', '60진법·달력 발달', '함무라비 법전(고대 법)'],
    cx: 230,
    cy: 145,
    color: '#dc2626',
  },
  {
    id: 'egypt',
    name: '이집트 문명',
    river: '나일 강',
    approxBCE: '약 기원전 3000년경',
    region: '아프리카 북동부',
    features: ['상형문자', '피라미드·미라 (사후세계 신앙)', '태양력 발달'],
    cx: 215,
    cy: 175,
    color: '#f59e0b',
  },
  {
    id: 'indus',
    name: '인도(인더스) 문명',
    river: '인더스 강',
    approxBCE: '약 기원전 2500년경',
    region: '오늘날 파키스탄·인도 서부',
    features: ['모헨조다로 같은 계획 도시', '하수도 시설 발달', '인더스 문자(아직 미해독)'],
    cx: 320,
    cy: 175,
    color: '#16a34a',
  },
  {
    id: 'china',
    name: '중국(황허) 문명',
    river: '황허(황하) 강',
    approxBCE: '약 기원전 2000년경',
    region: '중국 중북부',
    features: ['갑골문자(한자의 뿌리)', '청동기 그릇', '농업·정착 생활'],
    cx: 410,
    cy: 145,
    color: '#3b82f6',
  },
  {
    id: 'gojoseon',
    name: '고조선',
    river: '랴오허·대동강 일대',
    approxBCE: '기원전 2333년경 건국 (전설)',
    region: '한반도 북부 + 만주',
    features: ['단군 건국 이야기', '8조법 (3조만 전해짐: 살인·상해·도둑)', '청동기 → 철기 문화'],
    cx: 445,
    cy: 130,
    color: '#8b5cf6',
  },
];

export function AncientCivilizationsMap() {
  const [active, setActive] = useState<string>('mesopotamia');
  const cur = CIVS.find((c) => c.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          4대 문명 + 고조선 — 큰 강 가에 사람이 모였어요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          큰 강은 농사에 필요한 물·기름진 흙을 줘요. 그래서 문명은 큰 강을 따라 시작되었습니다. 같은 시기에 한반도 북쪽에서는 <strong>고조선</strong>이 일어났어요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 500 280" className="w-full">
          <rect x="0" y="0" width="500" height="280" fill="#dbeafe" className="dark:fill-blue-950/50" />
          <path d="M 60 80 L 200 60 L 350 80 L 460 90 L 470 130 L 460 180 L 350 200 L 220 195 L 100 175 L 60 130 Z" fill="#fde68a" stroke="#92400e" strokeWidth="1" />
          <path d="M 230 145 Q 220 170 215 200" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <path d="M 215 175 Q 210 220 200 250" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <path d="M 320 175 Q 320 200 325 240" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <path d="M 410 145 Q 415 170 425 200" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          {CIVS.map((c) => (
            <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
              <circle
                cx={c.cx}
                cy={c.cy}
                r={active === c.id ? 14 : 9}
                fill={c.color}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={c.cx}
                y={c.cy - 18}
                textAnchor="middle"
                fontSize="10"
                fontWeight={active === c.id ? 'bold' : 'normal'}
                fill={c.color}
              >
                {c.id === 'gojoseon' ? '고조선' : c.name.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {CIVS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
              active === c.id
                ? 'ring-2 ring-orange-300 font-bold'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
            style={{
              borderColor: active === c.id ? c.color : undefined,
              background: active === c.id ? c.color + '22' : undefined,
            }}
          >
            {c.id === 'gojoseon' ? '고조선' : c.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl border-l-4 p-4 space-y-2 text-sm"
        style={{ borderColor: cur.color, background: cur.color + '11' }}
      >
        <div className="font-bold" style={{ color: cur.color }}>
          {cur.name}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <div>
            <strong>강:</strong> {cur.river}
          </div>
          <div>
            <strong>시기:</strong> {cur.approxBCE}
          </div>
          <div>
            <strong>지역:</strong> {cur.region}
          </div>
        </div>
        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          {cur.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
