import { notFound } from 'next/navigation';
import { JoseonEarlyExplorer } from '@/components/interactive/social/JoseonEarlyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-04';

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
          {
            label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`,
            href: `/grade-${unit.grade}/${unit.subject}`,
          },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          1392년 이성계의 건국으로 시작된 조선은 약 500년간 한반도를 다스린 왕조예요. 그 가운데
          <strong> 전기(태조~선조 무렵)</strong>는 새 나라의 「뼈대를 만든 시기」예요. 정치 제도, 법전, 한글, 과학기구
          ─ 우리가 「조선스럽다」고 떠올리는 것의 대부분이 이 시기에 만들어졌어요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 어떻게 자리 잡았나">
        <p>
          <strong>태조</strong>는 새 왕조의 출발을 한양 천도와 경복궁 건립으로 못 박았어요. 이어진 왕자의 난을 거쳐
          즉위한 <strong>태종</strong>은 사병을 없애고 6조 직계제를 도입해 왕권을 강화했어요. 이 안정 위에서
          <strong> 세종</strong>은 한글 창제, 천문 관측 기구, 농업서 같은 문화·과학적 성과를 쌓아 올렸어요. 이후
          <strong> 세조·성종</strong> 대에 「<em>경국대전</em>」이 완성되면서 통치 구조가 법으로 굳어졌고요.
        </p>
        <p>
          16세기에 들어서면 「사림」이 정계에 본격 진출하면서 4대 사화 같은 정치적 갈등이 잇따랐어요. 그리고 16세기 말
          <strong> 임진왜란(1592~1598)</strong>이 일어나면서 전기 조선의 안정은 큰 충격을 받게 돼요. 이 전쟁이 곧
          후기 사회 변동의 시작점이 되는 거죠.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「세종 = 한글만 만든 임금」 → 한글 창제는 세종의 여러 업적 중 하나일 뿐.
            천문·역법·농업서·국토 확장(4군 6진) 등 폭이 매우 넓었어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「조선은 처음부터 신분제가 강했다」 → 양천제(양인·천인) 자체는 시작부터 있었지만,
            양반·중인·상민·천민의 구분이 점점 굳어진 것은 시간이 지나면서예요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「붕당 = 무조건 부정적」 → 붕당은 본래 학파·정책 차이에서 출발한 정치적 다양성의
            형태였어요. 후기 들어 갈등이 격화된 결과만 보고 단순화하면 곤란해요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 조선 전기의 흔적">
        <p>
          한글은 조선 전기의 가장 큰 유산이에요. 우리가 매일 쓰는 글자, 키보드 자판, 모바일 입력기까지 전부 이 흐름의
          끝자락이에요. 「자음+모음 조합」이라는 한글의 구조 덕분에 디지털 환경에서 한국어 입력 효율이 매우 높아요.
        </p>
        <p>
          한양(서울)이라는 수도의 자리 자체도 전기 조선이 정한 결정의 결과예요. 종묘·사직·궁궐·관청의 배치는 지금 서울
          중심부의 도시 형태로 그대로 이어졌어요. 광화문·경복궁은 그 흔적이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <JoseonEarlyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
