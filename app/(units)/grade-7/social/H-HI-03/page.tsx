import { notFound } from 'next/navigation';
import { KoreanHistoryTimeline } from '@/components/interactive/social/KoreanHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-03';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          <strong>고려(918~1392)</strong>는 왕건이 후삼국을 합쳐 세운 나라로, 약 500년 동안
          <strong> 거란·여진·몽골·왜구</strong>의 침입을 견디면서도 <strong>인쇄술·청자·불교 미술</strong>에서
          세계 수준의 문화를 남겼어요.
        </p>
      </SectionCard>
      <SectionCard title="고려는 왜 강하고 동시에 약했나">
        <p>
          고려의 강점은 <strong>유연한 외교</strong>였어요. 거란·여진·송·원 사이에서 형식적으론 사대를 받아들이면서도, 실제로는 자기 영토와 문화를 지켰어요.
          서희가 거란과 담판해 강동 6주를 얻은 일이 대표적이에요.
        </p>
        <p>
          약점은 <strong>왕권과 귀족 사이의 줄다리기</strong>. 무신정변(1170)으로 100여 년간 무인 권력자가 나라를 흔들었고,
          몽골 침입 후엔 원나라 영향 아래 자주성이 흔들렸어요. 그 끝에서 신진사대부와 이성계가 <strong>새 왕조 조선</strong>을 세웠어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오해">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"고려 = Korea의 어원"</strong> — 맞아요. 송·원·아라비아 상인들이 부르던 <em>Cauli/Coree</em>가 오늘날 영어 Korea가 되었어요.
          </li>
          <li>
            <strong>"고려는 불교의 시대, 조선은 유교의 시대"</strong> — 절반만 맞아요. 고려도 후기엔 성리학(유교)이 들어와 신진사대부의 사상이 됐고, 조선 초까지도 불교는 영향력을 유지했어요.
          </li>
          <li>
            <strong>"몽골이 점령했으니 모든 게 끝났다"</strong> — 강화도로 천도해 30여 년 항전했고, 항복 후에도 왕조와 행정은 유지됐어요. 다만 정치적 자주성은 크게 줄었어요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="오늘까지 남은 흔적">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          개성 만월대(고려 궁궐 터), 강화도 고려궁지, 합천 해인사 팔만대장경, 청자(국립중앙박물관),
          『직지심체요절』(현존 세계 최고 금속활자 인쇄본, 1377). 행정 단위 "도(道)"의 뼈대도 고려에서 시작됐어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
