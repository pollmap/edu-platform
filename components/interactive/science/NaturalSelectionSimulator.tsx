'use client';

// S-BIO-06 진화·생태계 — 자연선택 시뮬레이션.
// 두 형질(밝은 색 / 어두운 색) 비율이 환경 색깔(배경)에 따라 세대 거듭되며 변하는 모습.
// 생존확률 = exp(-distance / temperature). 자손 수 = 생존자에 비례.

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Generation {
  gen: number;
  light: number; // 밝은 색 비율 0-1
  dark: number; // 어두운 색 비율
}

function step(prevLight: number, envDarkness: number, selection: number): number {
  // envDarkness 0=밝은 환경 (밝은 색 유리) ~ 1=어두운 환경 (어두운 색 유리)
  // selection 0~1 — 압력 강도
  const lightFitness = 1 - envDarkness; // 0~1
  const darkFitness = envDarkness;
  // 평균 적합도
  const wL = 1 - selection + selection * lightFitness;
  const wD = 1 - selection + selection * darkFitness;
  const newL = (prevLight * wL) / (prevLight * wL + (1 - prevLight) * wD);
  return Math.max(0.01, Math.min(0.99, newL));
}

const GENS = 30;
const W = 360;
const H = 200;
const PAD = 28;

export function NaturalSelectionSimulator() {
  const [envDarkness, setEnvDarkness] = useState(0.7); // 어두운 환경
  const [selection, setSelection] = useState(0.4); // 자연선택 압력
  const [initialLight, setInitialLight] = useState(0.5);
  const [running, setRunning] = useState(false);
  const [series, setSeries] = useState<Generation[]>([{ gen: 0, light: initialLight, dark: 1 - initialLight }]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setSeries((prev) => {
        if (prev.length >= GENS + 1) {
          setRunning(false);
          return prev;
        }
        const last = prev[prev.length - 1];
        const newLight = step(last.light, envDarkness, selection);
        return [...prev, { gen: last.gen + 1, light: newLight, dark: 1 - newLight }];
      });
    }, 220);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, envDarkness, selection]);

  const reset = () => {
    setRunning(false);
    setSeries([{ gen: 0, light: initialLight, dark: 1 - initialLight }]);
  };

  const xScale = (g: number) => PAD + ((W - PAD * 2) * g) / GENS;
  const yScale = (v: number) => H - PAD - (H - PAD * 2) * v;

  const lightPath = series
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.gen).toFixed(1)},${yScale(p.light).toFixed(1)}`)
    .join(' ');
  const darkPath = series
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.gen).toFixed(1)},${yScale(p.dark).toFixed(1)}`)
    .join(' ');

  const last = series[series.length - 1];
  const envBg = useMemo(() => {
    const d = Math.round((1 - envDarkness) * 230);
    return `rgb(${d},${d},${d})`;
  }, [envDarkness]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow
          label="🌳 환경 어두움 (0=밝음, 1=어두움)"
          value={envDarkness}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => {
            setEnvDarkness(v);
            reset();
          }}
          format={(v) => v.toFixed(2)}
        />
        <SliderRow
          label="⚔️ 자연선택 압력"
          value={selection}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => {
            setSelection(v);
            reset();
          }}
          format={(v) => v.toFixed(2)}
        />
        <SliderRow
          label="🦋 초기 밝은색 비율"
          value={initialLight}
          min={0.05}
          max={0.95}
          step={0.05}
          onChange={(v) => {
            setInitialLight(v);
            setSeries([{ gen: 0, light: v, dark: 1 - v }]);
          }}
          format={(v) => v.toFixed(2)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (series.length >= GENS + 1) reset();
            setRunning((r) => !r);
          }}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium min-h-[44px]"
        >
          {running ? '⏸ 일시정지' : series.length >= GENS + 1 ? '🔁 처음부터' : '▶️ 시작'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium min-h-[44px]"
        >
          초기화
        </button>
      </div>

      {/* 환경 + 개체군 미리보기 */}
      <div
        className="rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 transition-colors"
        style={{ background: envBg }}
      >
        <div className="text-xs text-zinc-700 dark:text-zinc-200 mb-2 font-medium">
          세대 {last.gen} — 환경에서 보이는 개체군
        </div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 60 }).map((_, i) => {
            const isLight = i / 60 < last.light;
            return (
              <span
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: isLight ? '#f4f4f4' : '#1f1f1f',
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
                title={isLight ? '밝은 색 개체' : '어두운 색 개체'}
              />
            );
          })}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="세대별 형질 비율 변화">
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="currentColor" strokeOpacity={0.3} />
          {[0, 0.25, 0.5, 0.75, 1].map((y) => (
            <g key={y}>
              <line
                x1={PAD}
                y1={yScale(y)}
                x2={W - PAD}
                y2={yScale(y)}
                stroke="currentColor"
                strokeOpacity={0.06}
                strokeDasharray="2 2"
              />
              <text x={PAD - 4} y={yScale(y) + 3} textAnchor="end" fontSize="9" fill="currentColor" opacity={0.5}>
                {(y * 100).toFixed(0)}%
              </text>
            </g>
          ))}
          {[10, 20, 30].map((g) => (
            <text
              key={g}
              x={xScale(g)}
              y={H - 10}
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              opacity={0.5}
            >
              {g}세대
            </text>
          ))}
          <path d={lightPath} stroke="#fbbf24" strokeWidth={2.5} fill="none" />
          <path d={darkPath} stroke="#1e293b" strokeWidth={2.5} fill="none" className="dark:stroke-zinc-100" />
          <text x={W - PAD - 6} y={PAD + 12} textAnchor="end" fontSize="10" fill="#fbbf24" fontWeight="bold">
            밝은색 {(last.light * 100).toFixed(0)}%
          </text>
          <text
            x={W - PAD - 6}
            y={PAD + 26}
            textAnchor="end"
            fontSize="10"
            fill="currentColor"
            fontWeight="bold"
          >
            어두운색 {(last.dark * 100).toFixed(0)}%
          </text>
        </svg>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 산업혁명 시기 영국 회색가지나방(peppered moth) 사례 — 매연으로 검어진 자작나무에서 검은 형질이 1세기 만에
        희소→다수로 역전. 자연선택은 「개체」가 아닌 「개체군의 유전자 빈도」를 변화시켜요.
      </div>
    </div>
  );
}
