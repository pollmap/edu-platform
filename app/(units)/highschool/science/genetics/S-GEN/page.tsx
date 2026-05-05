import { notFound } from 'next/navigation';
import { UnitSGENExplorer } from '@/components/interactive/science/highschool/UnitSGENExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-GEN';

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
          { label: '생물의 유전' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          유전정보는 <strong>「DNA → mRNA → 단백질」</strong> 한 방향으로 흐른다는 게 분자생물학의 중심 도그마.
          DNA의 4글자(A·T·G·C) 서열이 단백질의 20가지 아미노산 서열로 번역돼 모든 형질을 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 복제·전사·번역">
        <p>
          복제: 두 가닥이 풀려 각자가 주형 → 반보존적 복제 (DNA 중합효소).
          전사: DNA 한 가닥을 주형으로 mRNA 합성 (RNA 중합효소). T → A, A → U.
          번역: 리보솜이 mRNA를 코돈(3개) 단위로 읽고, tRNA가 짝 맞는 아미노산을 가져와 펩티드 결합. AUG 시작·UAA/UAG/UGA 종결.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "DNA만 있으면 형질이 결정" — 후성유전(메틸화)·환경이 발현을 크게 좌우.<br />
          ❌ "한 유전자 → 한 단백질" — 대체 스플라이싱으로 한 유전자가 여러 단백질 생산.<br />
          ❌ "돌연변이는 모두 해롭다" — 중립·유리 돌연변이가 진화의 원료. CRISPR도 의도적 돌연변이 기술.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          mRNA 코로나 백신은 전사·번역 메커니즘을 그대로 이용. CRISPR-Cas9 유전자 가위는 겸상적혈구 치료제(Casgevy)로 승인.
          수능 생명과학Ⅱ 「유전자 발현」은 코돈표 해석·돌연변이 결과 추정이 ★ 단골. DNA 서열 → 아미노산 서열 매핑 연습 필수.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSGENExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
