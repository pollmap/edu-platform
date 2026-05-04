import { notFound } from 'next/navigation';
import { BiologyClassificationTree } from '@/components/interactive/science/BiologyClassificationTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-LI-01';

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
          지구상의 생물은 <strong>식물·동물·균·원생생물·세균</strong>의 5계로 크게 나누고,
          더 잘게는 종(species)까지 약 870만 종 이상으로 추정돼요.
          모든 분류는 <strong>공통 특징을 공유하는 무리끼리</strong> 묶는 일이에요.
        </p>
      </SectionCard>
      <SectionCard title="왜 분류할까 — 분류는 정리하기 위한 도구">
        <p>
          분류의 목적은 두 가지예요. 첫째는{' '}
          <strong>이름표 붙이기</strong>: 헷갈리지 않게 부르려고. 둘째는{' '}
          <strong>관계 보기</strong>: 어떤 두 생물이 가까운 친척인지, 진화 과정에서 언제 갈라졌는지 추측하기 위해서.
        </p>
        <p>
          최신 분류는 DNA를 비교해 만든 <strong>계통수(phylogenetic tree)</strong>로 표시돼요.
          중학교에서는 우선 보이는 특징(꽃이 피는지, 등뼈가 있는지 등)으로 가르는 5계 분류를 배워요.
          이게 가장 큰 그림이고, 고등학교 가서는 3역(고세균·세균·진핵)으로 더 세분화해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"버섯은 식물"</strong> — 아니에요. 광합성을 안 하고 균사로 영양을 흡수해요. <strong>균계</strong>예요.
          </li>
          <li>
            <strong>"미생물 = 세균"</strong> — 미생물 중에는 세균(원핵)뿐 아니라 효모(균계), 짚신벌레(원생생물)도 있어요.
          </li>
          <li>
            <strong>"바이러스도 생물"</strong> — 바이러스는 스스로 물질대사·번식이 안 돼서 생물 5계 어디에도 속하지 않는 특수 존재로 다뤄요.
          </li>
          <li>
            <strong>"고래·박쥐는 분류상 같다"</strong> — 고래는 포유류이고 박쥐도 포유류예요. 외형이 달라도 새끼를 젖으로 키우고 털이 있어 같은 강(綱)으로 묶여요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 연결">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          마트의 채소 코너 — 무·당근(쌍떡잎식물 뿌리), 양배추·시금치(쌍떡잎식물 잎), 양파·파(외떡잎식물 비늘줄기).
          냉장고의 김치는 <strong>유산균</strong> 발효, 빵·맥주는 <strong>효모(균계)</strong> 발효예요.
          반려동물의 강아지·고양이·햄스터는 모두 포유류지만 식성·서식지에 따라 더 잘게 분류돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BiologyClassificationTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
