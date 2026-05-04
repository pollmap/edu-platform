'use client';

// S6-ME-02 전기의 이용 — 직렬·병렬 회로 시뮬, 전구 켜짐/꺼짐.

import { useState } from 'react';

type Mode = 'series' | 'parallel';

export function CircuitBuilder() {
  const [mode, setMode] = useState<Mode>('series');
  const [voltage, setVoltage] = useState(3);
  const [bulbs, setBulbs] = useState<boolean[]>([true, true]);
  const [switchOn, setSwitchOn] = useState(true);

  const toggleBulb = (i: number) => {
    setBulbs((prev) => prev.map((b, j) => (j === i ? !b : b)));
  };

  // 직렬: 한 전구라도 끊기면 모두 꺼짐
  // 병렬: 각 전구는 독립
  const circuitOn = switchOn && voltage > 0;
  const seriesAllConnected = bulbs.every((b) => b);
  const seriesLit = circuitOn && seriesAllConnected;
  const brightness = (lit: boolean, count: number) =>
    lit ? Math.min(1, voltage / (mode === 'series' ? count * 1.5 : 1.5)) : 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          직렬 vs 병렬 — 전구를 클릭해 보기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          전구를 끄거나 켜고, 회로 모양을 바꾸면 어떻게 다른지 확인해요. <strong>직렬은 하나만 끊겨도 전부 꺼져요.</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode('series')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            mode === 'series'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          직렬연결
        </button>
        <button
          type="button"
          onClick={() => setMode('parallel')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            mode === 'parallel'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          병렬연결
        </button>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label={`${mode} 회로`}>
          <rect x="40" y="170" width="40" height="30" fill="#fbbf24" stroke="white" />
          <text x="60" y="190" fontSize="10" textAnchor="middle" fill="#7c2d12" fontWeight="bold">{voltage}V</text>
          <text x="60" y="215" fontSize="9" textAnchor="middle" fill="#fde047">건전지</text>

          <line x1="80" y1="180" x2="120" y2="180" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
          <g
            onClick={() => setSwitchOn((s) => !s)}
            style={{ cursor: 'pointer' }}
          >
            <line x1="120" y1="180" x2={switchOn ? 150 : 145} y2={switchOn ? 180 : 165} stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2.5" />
            <circle cx="120" cy="180" r="3" fill="white" />
            <circle cx="150" cy="180" r="3" fill="white" />
            <text x="135" y="205" fontSize="9" textAnchor="middle" fill={switchOn ? '#86efac' : '#fb923c'}>스위치 {switchOn ? 'ON' : 'OFF'}</text>
          </g>

          {mode === 'series' ? (
            <g>
              <line x1="150" y1="180" x2="180" y2="180" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
              {[180, 270].map((bx, i) => {
                const lit = seriesLit && bulbs[i];
                const bri = brightness(lit, bulbs.filter((b) => b).length);
                return (
                  <g key={i} onClick={() => toggleBulb(i)} style={{ cursor: 'pointer' }}>
                    <circle cx={bx + 25} cy="180" r="22" fill={`rgba(253,224,71,${bri * 0.8})`} stroke={bulbs[i] ? '#fde047' : '#94a3b8'} strokeWidth="2" />
                    <circle cx={bx + 25} cy="180" r="14" fill={`rgba(254,240,138,${bri})`} />
                    <text x={bx + 25} y="184" fontSize="9" textAnchor="middle" fill={bulbs[i] ? '#7c2d12' : '#94a3b8'}>{bulbs[i] ? '✓' : '✗'}</text>
                    <text x={bx + 25} y="215" fontSize="9" textAnchor="middle" fill={bulbs[i] ? '#fde047' : '#94a3b8'}>전구{i + 1}</text>
                    <line x1={bx + 47} y1="180" x2={bx + 70} y2="180" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
                  </g>
                );
              })}
              <line x1="340" y1="180" x2="360" y2="180" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="360" y1="180" x2="360" y2="60" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="360" y1="60" x2="60" y2="60" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="60" y1="60" x2="60" y2="170" stroke={seriesLit ? '#22c55e' : '#64748b'} strokeWidth="2" />
            </g>
          ) : (
            <g>
              {[0, 1].map((i) => {
                const lit = circuitOn && bulbs[i];
                const bri = brightness(lit, 1);
                const bx = 240;
                const by = 100 + i * 80;
                return (
                  <g key={i} onClick={() => toggleBulb(i)} style={{ cursor: 'pointer' }}>
                    <line x1="180" y1={i === 0 ? 180 : 180} x2="180" y2={by} stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
                    <line x1="180" y1={by} x2={bx - 22} y2={by} stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
                    <circle cx={bx} cy={by} r="22" fill={`rgba(253,224,71,${bri * 0.8})`} stroke={bulbs[i] ? '#fde047' : '#94a3b8'} strokeWidth="2" />
                    <circle cx={bx} cy={by} r="14" fill={`rgba(254,240,138,${bri})`} />
                    <text x={bx} y={by + 4} fontSize="9" textAnchor="middle" fill={bulbs[i] ? '#7c2d12' : '#94a3b8'}>{bulbs[i] ? '✓' : '✗'}</text>
                    <text x={bx} y={by + 35} fontSize="9" textAnchor="middle" fill={bulbs[i] ? '#fde047' : '#94a3b8'}>전구{i + 1}</text>
                    <line x1={bx + 22} y1={by} x2="340" y2={by} stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
                    <line x1="340" y1={by} x2="340" y2="180" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
                  </g>
                );
              })}
              <line x1="150" y1="180" x2="180" y2="180" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="340" y1="180" x2="360" y2="180" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="360" y1="180" x2="360" y2="40" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="360" y1="40" x2="60" y2="40" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
              <line x1="60" y1="40" x2="60" y2="170" stroke={circuitOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      <div>
        <div className="text-xs text-zinc-500 mb-2">전압 (V)</div>
        <div className="flex gap-2">
          {[1.5, 3, 4.5, 6].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVoltage(v)}
              className={`flex-1 px-2 py-2 text-sm rounded-md border min-h-[44px] ${
                voltage === v
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-800 dark:text-amber-200'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {v}V
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-sm">
        <div className="text-zinc-900 dark:text-zinc-100">
          {mode === 'series'
            ? '직렬: 전구 하나를 끄면(✗) 모든 전구가 꺼져요. 전압이 나눠 걸려서 어두워요.'
            : '병렬: 각 전구는 독립 — 하나를 꺼도 다른 전구는 켜져 있어요. 모두 같은 밝기.'}
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 우리 집 콘센트는 모두 <strong>병렬</strong>이에요. 한 방 전등이 꺼져도 다른 방은 멀쩡한 이유.
      </p>
    </div>
  );
}
