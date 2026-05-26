import type { Metadata } from 'next';
import { ProgressDashboard } from '@/components/primitives/ProgressDashboard';
import { getLearningUnits, getTotalUnitCount } from '@/lib/learning-units';

export const metadata: Metadata = {
  title: '학습 현황',
  description: '완료, 복습 큐, 즐겨찾기, 과목별 진도를 확인하는 하루배움 학습 현황',
};

export default function ProgressPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <ProgressDashboard units={getLearningUnits()} totalUnits={getTotalUnitCount()} />
    </main>
  );
}
