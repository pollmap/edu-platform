# 기여 가이드

## 양산 매뉴얼

이 프로젝트의 단원 양산 표준은 `docs/03-claude-code-playbook.md`, `docs/COMPLETION-AUDIT.md`, `docs/design/figma-stitch-handoff.md`를 따릅니다.

## 단원 1개 작업 표준 절차 (요약)

1. **메타 확인**: `docs/00-MASTER-INDEX.md` 에서 단원 ID 찾기, NCIC 성취기준 대조
2. **패턴 선택**: `docs/02-component-catalog.md` 의 20 패턴 중 1~2개
3. **컴포넌트 작성**: `components/interactive/<subj>/<Comp>.tsx`
   - `'use client'` 디렉티브
   - useState · useRef · useEffect 표준
   - 슬라이더는 `<SliderRow />`, 프리셋은 `<PresetBar />` 사용
4. **page.tsx 작성**: `app/(units)/<grade>/<subject>/<id>/page.tsx`
   - `<UnitHeader />`, `<SectionCard />`, `<PrerequisiteList />` primitives
   - 인터랙티브는 `<InteractiveErrorBoundary>` 로 감싸기
   - `export const metadata = makeUnitMetadata(UNIT)`
5. **수식**: `<MathFormula tex="..." />` 사용 (KaTeX)
6. **검증**:
   - `npm run validate` 성공
   - `npm run audit:completion` blocker 0개
   - `npm run tsc` 0 에러
   - `npm run build` 성공
   - 모바일 360px 가로 스크롤 X (DevTools)
   - 터치 타겟 44px+
   - 다크모드 contrast OK

## 커밋 규약

```
feat(<scope>): <ID> <단원명>
```

- `<scope>`: math | sci | kor | eng | soc | infra | interactive | design | content
- 1 단원 = 1 커밋
- 인터랙티브 추가는 별 커밋: `feat(interactive): <ComponentName>`

## 저작권 / 데이터 출처

- 단원 메타: NCIC 2022 개정 교육과정 (출처 표기 의무)
- 통계: KOSIS · 통계청
- 역사: 한국사데이터베이스
- 일러스트: unDraw · OpenPeeps만 (다른 IP 사용 금지)
- 문학 작품 본문 인용 금지 (구조·주제만)

## 브랜치 전략

- `main`: 항상 deploy 가능
- 단원 작업: `feat/<id>` 브랜치 → PR → main 머지
- 스프린트 = 1 PR

## Quality Gate

- 단원 단위: 위 §6 검증 항목
- 스프린트 단위: CI green / `audit:completion` blocker 0개 / `audit:security` 취약점 0개 / 빌드 시간 +20% 이내 / 무작위 5 단원 NCIC 대조

## 행동 강령

비영리 학습 자원입니다. 학습자 안전·정확·접근성을 우선합니다.
