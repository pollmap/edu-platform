'use client';

import { useMemo } from 'react';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SliderRow } from '@/components/primitives/SliderRow';

// 단순화된 모델: P(가격) = 0..20, Q(수량) = 0..20.
// 수요 곡선 D: P = -m_d * Q + a (음의 기울기, a = 수요 절편)
// 공급 곡선 S: P = m_s * Q + b (양의 기울기, b = 공급 절편)
// 균형점: -m_d Q + a = m_s Q + b → Q* = (a - b) / (m_d + m_s)
//                                  P* = m_s Q* + b

interface DataPoint {
  q: number;
  demand: number;
  supply: number;
}

export function SupplyDemandExplorer() {
  const [demandShift, setDemandShift] = useState(0); // 절편 a 변화
  const [supplyShift, setSupplyShift] = useState(0); // 절편 b 변화

  const md = 1; // 수요 기울기 절댓값
  const ms = 1; // 공급 기울기
  const a = 18 + demandShift;
  const b = 4 + supplyShift;

  const data = useMemo<DataPoint[]>(() => {
    const pts: DataPoint[] = [];
    for (let q = 0; q <= 20; q++) {
      pts.push({
        q,
        demand: Math.max(0, -md * q + a),
        supply: ms * q + b,
      });
    }
    return pts;
  }, [a, b]);

  const eqQ = (a - b) / (md + ms);
  const eqP = ms * eqQ + b;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
        수요·공급 곡선과 균형 가격
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        곡선이 만나는 곳이 <strong>시장 균형점</strong>이에요. 슬라이더로 곡선을 좌우로 이동시켜
        균형점이 어떻게 바뀌는지 확인하세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4 aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.3)" />
              <XAxis dataKey="q" label={{ value: '수량 Q', position: 'insideBottom', offset: -8 }} />
              <YAxis label={{ value: '가격 P', angle: -90, position: 'insideLeft', offset: 12 }} domain={[0, 22]} />
              <Tooltip />
              <Line type="linear" dataKey="demand" stroke="#dc2626" strokeWidth={3} dot={false} name="수요 D" />
              <Line type="linear" dataKey="supply" stroke="#2563eb" strokeWidth={3} dot={false} name="공급 S" />
              {eqQ >= 0 && eqQ <= 20 && eqP >= 0 ? (
                <ReferenceDot x={eqQ} y={eqP} r={6} fill="#f59e0b" stroke="#92400e" strokeWidth={2} />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <SliderRow
            label="수요 곡선 이동 (a 절편 ±)"
            value={demandShift}
            min={-8}
            max={8}
            step={1}
            onChange={setDemandShift}
            format={(v) => (v >= 0 ? `+${v}` : `${v}`)}
          />
          <SliderRow
            label="공급 곡선 이동 (b 절편 ±)"
            value={supplyShift}
            min={-3}
            max={8}
            step={1}
            onChange={setSupplyShift}
            format={(v) => (v >= 0 ? `+${v}` : `${v}`)}
          />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 text-sm space-y-1">
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">균형 수량 Q*</span>{' '}
              <span className="font-mono">{eqQ.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">균형 가격 P*</span>{' '}
              <span className="font-mono">{eqP.toFixed(2)}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
              수요 ↑ (a 증가) → 균형 가격↑·수량↑ · 공급 ↑ (b 감소) → 가격↓·수량↑
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
