import { notFound } from 'next/navigation';
import { ImageFilterExplorer } from '@/components/interactive/math/highschool/ImageFilterExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-03';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: '인공지능 수학', href: '/highschool/math/ai-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          AI가 「보는」 이미지는 사실 <strong>0~255 사이의 숫자가 가로·세로로 배열된 행렬</strong>이에요.
          작은 「커널 행렬」로 슬라이딩시켜 곱·합하면 블러·샤픈·엣지 같은 효과가 나오고, 이게 CNN(합성곱 신경망)의 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 합성곱(컨볼루션)">
        <p>
          출력 픽셀 = Σ (커널 · 주변 픽셀). 커널이 「엣지 검출 = 중심에 8, 주변에 −1」이면 「주변과 다른 픽셀」만 살아남아요.
          블러 커널은 모든 자리에 1/9 → 평균 → 흐려져요. 샤픈 커널은 차이를 키워 또렷해져요.
          컬러 이미지는 R·G·B 각각의 행렬 3개. CNN은 이 커널들을 학습으로 자동으로 찾아내요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「블러는 정보를 잃기만 한다」 — 노이즈도 같이 줄어 안정적인 특징을 추출하기 좋아져요.
          ❌ 「커널이 클수록 좋다」 — 너무 크면 디테일이 다 뭉개지고 계산량도 폭증해요. 보통 3×3, 5×5.
          ❌ 「가장자리 처리는 무시 가능」 — 경계에서 0으로 채울지(zero-pad) 복제할지 선택이 결과에 큰 영향을 줘요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          카메라 앱의 필터, 얼굴 인식, 자율주행의 차선 검출, 의료 영상 진단 — 모두 컨볼루션이 핵심이에요.
          최근 Vision Transformer(ViT)도 결국 이미지를 패치(작은 행렬 조각)로 쪼개 처리해요.
          시뮬레이터에서 5가지 커널을 바꿔 보며 「행렬 한 줄로 시각효과가 바뀌는」 위력을 체험해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ImageFilterExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
