import { notFound } from 'next/navigation';
import { SquareRootNumberLine } from '@/components/interactive/math/SquareRootNumberLine';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-NA-01';

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
          √n은 <strong>제곱하면 n이 되는 0 이상의 수</strong>예요. n이 완전제곱수가 아니면 √n은 분수로 못 쓰는
          <strong> 무리수</strong>지만, 수직선 위에 정확한 점으로 찍을 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="왜 무리수도 수직선 위에 있을까?">
        <p>
          가로 1, 세로 1인 직각삼각형의 빗변은 피타고라스 정리로 √(1² + 1²) = √2 길이예요. 이 빗변을 컴퍼스로
          수직선에 내려놓으면 그 끝점이 곧 √2의 위치예요. 일반화하면 √n은 a² + b² = n인 정수 쌍 (a, b)로
          작도할 수 있어요. <strong>유리수와 무리수가 함께 수직선을 빈틈없이 채운 수</strong>가 실수예요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          √4 + √9 = √13 이라고 쓰면 안 돼요. 제곱근은 그대로 더할 수 없고, 각각 계산해서 2 + 3 = 5예요.
          또 <strong>√(a²) = a</strong>는 a가 0 이상일 때만 맞아요. a가 음수일 때는 |a|로 써야 해요.
          ‘제곱근’이라 해서 두 값이 있다 vs ‘√기호’는 양수 하나만 의미한다 이 차이도 헷갈리지 마세요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          A4 종이의 짧은 변과 긴 변의 비율이 <strong>1 : √2</strong>예요. 그래서 반으로 접어도 모양이 똑같아 보여요.
          또 정사각형 한 변이 1 m면 대각선이 √2 m로, 약 1.41 m. 평방근은 길이·넓이를 잇는 다리라 건축·디자인에서
          자주 등장해요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SquareRootNumberLine />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
