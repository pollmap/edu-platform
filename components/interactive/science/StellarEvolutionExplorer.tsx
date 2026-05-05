'use client';

// S9-EU-01 별과 우주 — HR도(헤르츠스프룽-러셀도)와 별의 진화 단계.
// 질량을 바꾸면 진화 경로가 달라지는 핵심 본질을 보여준다.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Star {
  name: string;
  temp: number; // K
  lum: number; // 태양 = 1
  cls: string;
  color: string;
}

const STARS: Star[] = [
  { name: '리겔', temp: 12000, lum: 120000, cls: '청색초거성', color: '#9bb8ff' },
  { name: '데네브', temp: 8500, lum: 200000, cls: '청백색초거성', color: '#cfd9ff' },
  { name: '시리우스', temp: 9940, lum: 25, cls: '주계열', color: '#dbe7ff' },
  { name: '태양', temp: 5778, lum: 1, cls: '주계열', color: '#fde68a' },
  { name: '아크투루스', temp: 4286, lum: 170, cls: '적색거성', color: '#fcb45c' },
  { name: '베텔게우스', temp: 3500, lum: 90000, cls: '적색초거성', color: '#fb7e3a' },
  { name: '바너드 별', temp: 3134, lum: 0.0035, cls: '적색왜성', color: '#f87171' },
  { name: '시리우스 B', temp: 25000, lum: 0.026, cls: '백색왜성', color: '#e0e7ff' },
];

const W = 380;
const H = 280;
const PAD_L = 40;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 36;

// X축: 온도 (역방향 로그) 50000K → 2500K
// Y축: 광도 (로그) 10^-4 → 10^6
const TEMP_MIN = 2500;
const TEMP_MAX = 50000;
const LUM_MIN = 1e-4;
const LUM_MAX = 1e6;

function xScale(t: number) {
  const lt = Math.log10(t);
  const lmin = Math.log10(TEMP_MIN);
  const lmax = Math.log10(TEMP_MAX);
  // 역방향 (고온 왼쪽)
  return PAD_L + ((lmax - lt) / (lmax - lmin)) * (W - PAD_L - PAD_R);
}

function yScale(l: number) {
  const ll = Math.log10(Math.max(l, LUM_MIN));
  const lmin = Math.log10(LUM_MIN);
  const lmax = Math.log10(LUM_MAX);
  return H - PAD_B - ((ll - lmin) / (lmax - lmin)) * (H - PAD_T - PAD_B);
}

function massToStar(mass: number) {
  // 주계열 단계 광도-질량 관계 (Stefan-Boltzmann 근사)
  const lum = Math.pow(mass, 3.5);
  const temp = 5778 * Math.pow(mass, 0.55);
  // 주계열 수명(태양=100억년) ~ M^-2.5 (10^10 yr)
  const lifeYr = 1e10 * Math.pow(mass, -2.5);
  return { lum, temp, lifeYr };
}

const STAGES = [
  { key: 'cloud', label: '성운', desc: '수소 가스 구름이 중력으로 수축' },
  { key: 'protostar', label: '원시별', desc: '중심 온도 상승' },
  { key: 'main', label: '주계열', desc: '수소 핵융합 안정 단계' },
  { key: 'giant', label: '거성', desc: '수소 고갈 → 외피 팽창' },
  { key: 'end', label: '최후', desc: '질량별 운명 결정' },
];

export function StellarEvolutionExplorer() {
  const [mass, setMass] = useState(1.0); // 태양질량
  const [stage, setStage] = useState(2); // 0~4

  const star = useMemo(() => massToStar(mass), [mass]);

  // 단계별 (T, L) 경로
  const path = useMemo(() => {
    const t0 = 3000;
    const l0 = 0.01;
    const main = star;
    const giant = { temp: 3500, lum: main.lum * 100 };
    const end =
      mass < 8
        ? { temp: 12000, lum: 0.01, label: '백색왜성' }
        : mass < 25
          ? { temp: 5000, lum: 1e-4, label: '중성자별' }
          : { temp: 3500, lum: 1e-5, label: '블랙홀' };
    return [
      { temp: t0, lum: l0 },
      { temp: t0 * 1.5, lum: l0 * 5 },
      { temp: main.temp, lum: main.lum },
      { temp: giant.temp, lum: giant.lum },
      { temp: end.temp, lum: end.lum, label: end.label },
    ];
  }, [mass, star]);

  const current = path[stage];
  const endLabel = (path[4] as { label?: string }).label;

  const lifeText = useMemo(() => {
    const yr = star.lifeYr;
    if (yr > 1e9) return `약 ${(yr / 1e9).toFixed(1)}억 년`;
    if (yr > 1e6) return `약 ${(yr / 1e6).toFixed(0)}백만 년`;
    return `약 ${yr.toExponential(1)} 년`;
  }, [star.lifeYr]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow
          label="별의 질량 (태양 = 1)"
          value={mass}
          min={0.1}
          max={30}
          step={0.1}
          onChange={(v) => setMass(v)}
          format={(v) => `${v.toFixed(1)} M⊙`}
        />
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">진화 단계</span>
            <span className="font-mono text-red-500 dark:text-red-400 font-semibold">
              {STAGES[stage].label}
            </span>
          </div>
          <div className="flex gap-1">
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setStage(i)}
                className={`flex-1 px-2 py-2 rounded text-xs font-medium min-h-[40px] ${
                  i === stage
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="HR도">
          {/* 격자 */}
          {[1e-4, 1e-2, 1, 1e2, 1e4, 1e6].map((l) => (
            <g key={l}>
              <line
                x1={PAD_L}
                y1={yScale(l)}
                x2={W - PAD_R}
                y2={yScale(l)}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeDasharray="2 3"
              />
              <text
                x={PAD_L - 4}
                y={yScale(l) + 3}
                textAnchor="end"
                fontSize="9"
                fill="currentColor"
                opacity={0.5}
              >
                10
                <tspan baselineShift="super" fontSize="6">
                  {Math.log10(l).toFixed(0)}
                </tspan>
              </text>
            </g>
          ))}
          {[2500, 5000, 10000, 25000, 50000].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={PAD_T}
                x2={xScale(t)}
                y2={H - PAD_B}
                stroke="currentColor"
                strokeOpacity={0.06}
              />
              <text
                x={xScale(t)}
                y={H - PAD_B + 12}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                opacity={0.5}
              >
                {t >= 1000 ? `${t / 1000}k` : t}
              </text>
            </g>
          ))}
          {/* 주계열 띠 */}
          <path
            d={`M${xScale(45000)},${yScale(1e5)} L${xScale(3000)},${yScale(1e-3)}`}
            stroke="#fbbf24"
            strokeOpacity={0.25}
            strokeWidth={18}
            fill="none"
            strokeLinecap="round"
          />
          {/* 알려진 별들 */}
          {STARS.map((s) => (
            <g key={s.name}>
              <circle cx={xScale(s.temp)} cy={yScale(s.lum)} r={3} fill={s.color} opacity={0.75} />
              <text
                x={xScale(s.temp) + 5}
                y={yScale(s.lum) - 4}
                fontSize="8"
                fill="currentColor"
                opacity={0.55}
              >
                {s.name}
              </text>
            </g>
          ))}
          {/* 진화 경로 */}
          <path
            d={path
              .map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.temp).toFixed(1)},${yScale(p.lum).toFixed(1)}`)
              .join(' ')}
            stroke="#10b981"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            fill="none"
            opacity={0.7}
          />
          {/* 현재 위치 */}
          <circle cx={xScale(current.temp)} cy={yScale(current.lum)} r={7} fill="#10b981" stroke="white" strokeWidth={1.5}>
            <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* 축 라벨 */}
          <text
            x={W / 2}
            y={H - 4}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            opacity={0.7}
          >
            ← 표면 온도(K)
          </text>
          <text
            x={10}
            y={H / 2}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            opacity={0.7}
            transform={`rotate(-90 10 ${H / 2})`}
          >
            광도 (태양=1)
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-800">
          <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            현재: {STAGES[stage].label}
          </div>
          <div className="text-zinc-700 dark:text-zinc-300">{STAGES[stage].desc}</div>
        </div>
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">주계열 수명</div>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{lifeText}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">최후의 운명</div>
          <div className="text-lg font-bold text-rose-600 dark:text-rose-400">{endLabel}</div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 별의 일생은 「질량」 하나로 거의 결정돼요. 무거운 별은 더 밝게 타지만 더 빨리 죽고, 가벼운 별은 어둡게 오래 살아요.
        태양은 약 100억 년의 주계열 수명을 갖고, 50억 년 후 적색거성을 거쳐 백색왜성이 됩니다.
      </div>
    </div>
  );
}
