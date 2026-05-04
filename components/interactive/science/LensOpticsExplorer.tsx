'use client';

// S6-ME-01 빛과 렌즈 — 볼록·오목 렌즈, 물체 거리, 초점거리 시뮬.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type LensType = 'convex' | 'concave';

export function LensOpticsExplorer() {
  const [lens, setLens] = useState<LensType>('convex');
  const [focal, setFocal] = useState(60);
  const [object, setObject] = useState(140);

  // 얇은 렌즈 공식: 1/f = 1/do + 1/di
  // 오목렌즈는 f를 음수로 취급
  const f = lens === 'convex' ? focal : -focal;
  const dimage = useMemo(() => {
    const denom = 1 / f - 1 / object;
    if (Math.abs(denom) < 1e-3) return 0;
    return 1 / denom;
  }, [f, object]);

  const mag = -dimage / object;
  const lensX = 220;
  const objY = 130;
  const objH = 40;
  const imgY = 130;
  const imgH = objH * Math.abs(mag);
  const imgX = lensX + dimage;
  const inverted = mag < 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          렌즈는 빛을 어떻게 휘게 할까?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>볼록렌즈</strong>는 빛을 모으고, <strong>오목렌즈</strong>는 빛을 퍼뜨려요. 물체 위치에 따라 상이 달라져요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setLens('convex')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            lens === 'convex'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          볼록렌즈 (수렴)
        </button>
        <button
          type="button"
          onClick={() => setLens('concave')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            lens === 'concave'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          오목렌즈 (발산)
        </button>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 overflow-hidden">
        <svg viewBox="0 0 440 220" className="w-full" role="img" aria-label="렌즈 광학">
          <line x1="20" y1="130" x2="420" y2="130" stroke="#475569" strokeWidth="0.6" strokeDasharray="3 3" />
          {lens === 'convex' ? (
            <ellipse cx={lensX} cy="130" rx="10" ry="60" fill="#3b82f6" opacity="0.4" stroke="#60a5fa" strokeWidth="1.5" />
          ) : (
            <g>
              <rect x={lensX - 10} y="70" width="20" height="120" fill="#1e3a8a" opacity="0.3" />
              <path d={`M ${lensX - 10} 70 Q ${lensX} 130 ${lensX - 10} 190 L ${lensX + 10} 190 Q ${lensX} 130 ${lensX + 10} 70 Z`} fill="#3b82f6" opacity="0.4" stroke="#60a5fa" strokeWidth="1.5" />
            </g>
          )}

          {[lensX - focal, lensX + focal].map((fx, i) => (
            <g key={i}>
              <circle cx={fx} cy="130" r="3" fill="#fbbf24" />
              <text x={fx} y="120" fontSize="9" fill="#fde047" textAnchor="middle">F</text>
            </g>
          ))}

          <line x1={lensX - object} y1={objY} x2={lensX - object} y2={objY - objH} stroke="#22c55e" strokeWidth="3" />
          <polygon points={`${lensX - object - 4},${objY - objH + 4} ${lensX - object + 4},${objY - objH + 4} ${lensX - object},${objY - objH - 4}`} fill="#22c55e" />
          <text x={lensX - object} y={objY + 14} fontSize="9" fill="#86efac" textAnchor="middle">물체</text>

          <line x1={lensX - object} y1={objY - objH} x2={lensX} y2={objY - objH} stroke="#fde047" strokeWidth="1.2" opacity="0.7" />
          <line x1={lensX} y1={objY - objH} x2={Math.max(20, Math.min(420, imgX))} y2={inverted ? imgY + imgH : imgY - imgH} stroke="#fde047" strokeWidth="1.2" opacity="0.7" />

          <line x1={lensX - object} y1={objY - objH} x2={lensX} y2={130 + ((objH * (lensX - (lensX - object))) / focal) * (lens === 'concave' ? -0.5 : 0.5)} stroke="#fb923c" strokeWidth="0.8" opacity="0.5" />

          {Math.abs(imgX - lensX) < 400 && imgX > 20 && imgX < 420 && (
            <g>
              <line x1={imgX} y1={imgY} x2={imgX} y2={inverted ? imgY + imgH : imgY - imgH} stroke="#f87171" strokeWidth="2.5" strokeDasharray={lens === 'concave' || imgX < lensX ? '4 2' : ''} />
              <polygon
                points={
                  inverted
                    ? `${imgX - 4},${imgY + imgH - 4} ${imgX + 4},${imgY + imgH - 4} ${imgX},${imgY + imgH + 4}`
                    : `${imgX - 4},${imgY - imgH + 4} ${imgX + 4},${imgY - imgH + 4} ${imgX},${imgY - imgH - 4}`
                }
                fill="#f87171"
              />
              <text x={imgX} y={imgY + 28} fontSize="9" fill="#fca5a5" textAnchor="middle">상</text>
            </g>
          )}
        </svg>
      </div>

      <SliderRow
        label="초점 거리 (mm)"
        value={focal}
        min={30}
        max={120}
        step={5}
        onChange={setFocal}
        format={(v) => v.toFixed(0)}
      />
      <SliderRow
        label="물체 거리 (mm)"
        value={object}
        min={50}
        max={200}
        step={5}
        onChange={setObject}
        format={(v) => v.toFixed(0)}
      />

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
          <div className="text-xs text-zinc-500">상의 종류</div>
          <div className="font-bold text-blue-700 dark:text-blue-300">
            {lens === 'concave' ? '정립 축소 허상' : object > focal ? '도립 실상' : '정립 확대 허상'}
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3">
          <div className="text-xs text-zinc-500">배율</div>
          <div className="font-bold text-amber-700 dark:text-amber-300">{Math.abs(mag).toFixed(2)}배</div>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 카메라 렌즈·돋보기·현미경은 볼록렌즈, 근시 안경은 오목렌즈를 써요.
      </p>
    </div>
  );
}
