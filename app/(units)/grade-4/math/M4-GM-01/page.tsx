import { notFound } from 'next/navigation';
import { AngleProtractor } from '@/components/interactive/math/AngleProtractor';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-GM-01';

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
          각도는 두 변이 벌어진 정도를 0°~360°로 표시한 거예요. <strong>예각(0~90)·직각(90)·둔각(90~180)·평각(180)·반사각(180~360)</strong>으로 나뉘어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 360일까?">
        <p>
          각도 단위 360°는 약 4000년 전 메소포타미아의 60진법에서 유래했어요. 60×6=360, 한 해(365일)와 비슷해 일출·일몰 추적에 편리했어요.
          또 360은 약수가 많아(2,3,4,5,6,8,9,10,12...) 절반·1/3·1/4 등 분수로 나누기 쉽다는 장점이 있어요. 100°나 1000° 대신 360°를 쓰는 이유예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "큰 각이 더 길어 보이는 변에 그려진다" — 각도는 변의 길이와 관계없어요. 변이 짧아도 30°는 30°.
          ❌ "각도기는 한 방향으로만 잰다" — 각도기는 양쪽 눈금이 있어서 어느 변에서 시작해도 같은 각도가 나와야 해요.
          ❌ "직각은 위로만 향한다" — 직각은 90°라는 크기일 뿐, 어떤 방향이든 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 각도">
        <p>
          시계의 시침과 분침 사이 각도는 매분마다 바뀌어요(12시 정각 = 0°, 3시 = 90°, 6시 = 180°).
          축구 골대의 직각 모서리, 도로 교차로의 90°, 가위·문이 열리는 각도 — 우리 주변 모든 모서리가 각도예요.
          항해·비행에서 방위각도 360° 시스템을 그대로 써요(북쪽 = 0°, 동 = 90°, 남 = 180°, 서 = 270°).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AngleProtractor />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
