# Claude Code 작업 매뉴얼: 인터랙티브 제작 플레이북

이 문서는 현재 저장소 구조에서 단원, 인터랙티브 컴포넌트, 디자인 반영 작업을 일관되게 진행하기 위한 SOP다.

## 0. 현재 기준선

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| 패턴엔진 | 20/20 |
| legacy renderer | 0 |
| 완료 감사 | `npm run audit:completion` |
| 콘텐츠 감사 | `npm run audit:content` |
| Blueprint 감사 | `npm run audit:blueprint` |
| Interaction 감사 | `npm run audit:interaction` |

## 1. 작업 전 확인

1. `docs/00-MASTER-INDEX.md`에서 단원 ID와 인터랙티브 후보를 확인한다.
2. NCIC 또는 저장소 출처 문서로 단원명과 성취기준을 재확인한다.
3. `docs/02-component-catalog.md`의 20개 패턴 중 가장 가까운 패턴을 고른다.
4. `lib/unit-content/`에서 해당 단원의 sourceRefs와 세부 학습자료가 있는지 확인한다.
5. `lib/unit-blueprints/`에서 engineId, engineData, contentHints가 연결되는지 확인한다.
6. 기존 primitive와 pattern engine 패턴을 먼저 재사용한다.
7. 제품 UX 방향은 `docs/design/product-ux-foundation.md`와 `docs/design/competitive-ux-reverse-engineering.md`를 확인한다.
8. Figma/Stitch 반영 작업이면 `docs/design/figma-stitch-handoff.md`의 handoff 입력물을 확인한다.

## 2. 단원 작업 표준 절차

### Step 1. 메타데이터 확인

- 앱 메타데이터 진입점: `lib/curriculum/index.ts`
- 상태/선수학습/컴포넌트 보정: `lib/curriculum/overrides.ts`
- 단원 경로 생성: `unitPath(unit)`

단원 상태를 바꿀 때는 `npm run audit:completion`이 통과해야 한다.

### Step 1-1. UnitContent 확인

- 세부 학습자료 진입점: `lib/unit-content/index.ts`
- authored 콘텐츠 builder: `lib/unit-content/authored.ts`
- 모든 단원은 sourceRefs, 쉬운/표준/심화 설명, 예시 3개, 정확히 3문항 미니 문제, 정답/해설, 흔한 실수, 실생활 적용, 유효한 다음 단원 ID를 가져야 한다.
- 추가 단원은 공식 출처 행이 확인되기 전까지 `lib/curriculum/`이나 `lib/unit-content/`에 넣지 않는다.

세부 콘텐츠를 바꿀 때는 `npm run audit:content`가 통과해야 한다.

### Step 1-2. UnitBlueprint 확인

- Blueprint 진입점: `lib/unit-blueprints/index.ts`
- Audit 진입점: `lib/unit-blueprints/audits.ts`
- 모든 active unit은 source/content/interaction/contentHints/engineData를 가져야 한다.
- `implementationStatus.content`는 `authored-blueprint`, `implementationStatus.renderer`는 `pattern-engine`이어야 한다.
- 출처 ref는 `sourceType`, `officialUrl`, `documentTitle`, `documentDate`, `locator`, `evidenceText`, `retrievedAt`, `verificationStatus`를 가져야 한다.

Blueprint를 바꿀 때는 `npm run audit:blueprint`가 통과해야 한다.

### Step 2. Pattern engine 연결

파일 위치:

```text
components/interactive/pattern-engines/{EngineName}PatternEngine.tsx
components/interactive/pattern-engines/registry.tsx
components/interactive/UnitInteractiveRenderer.tsx
```

기준:

- client interaction이 있으면 `'use client'`를 사용한다.
- `PatternEngineProps`를 받는다.
- registry에 engineId -> component 매핑을 추가한다.
- 정상 경로에서 fallback UI를 추가하지 않는다. 누락은 감사나 렌더 오류로 드러나야 한다.
- 공용 입력 UI는 `SliderRow`, `PresetBar`, `MathFormula` 등 primitive를 우선 사용한다.
- 수식은 이미지가 아니라 KaTeX로 렌더링한다.
- 대표 단원을 `ENGINE_REPRESENTATIVE_UNITS`와 Playwright E2E에 연결한다.

Interaction을 바꿀 때는 `npm run audit:interaction`과 `npm run test:e2e`가 통과해야 한다.

### Step 3. 단원 페이지 작성

파일 위치:

```text
app/(units)/grade-9/math/M9-CR-03/page.tsx
app/(units)/common/korean/K-GR-01/page.tsx
app/(units)/highschool/math/calculus-1/M-CA1-03/page.tsx
```

기준:

- `makeUnitMetadata(UNIT)`로 metadata를 만든다.
- `UnitHeader`, `UnitProgressControls`, `UnitLearningMaterial`, `InteractiveErrorBoundary`, `UnitInteractiveRenderer`, `PrerequisiteList`를 일관되게 사용한다.
- 생성용 placeholder 문구를 남기지 않는다.
- 단원 구조는 `Learn -> Manipulate -> Check -> Review` 흐름을 따른다.
- 완료와 복습 큐는 분리한다.

### Step 4. 검증

최소 검증:

```bash
npm run validate
npm run audit:completion
npm run audit:content
npm run audit:blueprint
npm run audit:interaction
npm run tsc
npm test
```

스프린트/PR 검증:

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:content
npm run audit:blueprint
npm run audit:interaction
npm run audit:security
npm run tsc
npm test
npm run build
npm run test:e2e
npm run secret-grep
```

## 3. 품질 체크리스트

- [ ] 모바일 360px에서 가로 스크롤이나 겹침이 없다.
- [ ] 버튼, 슬라이더, 카드의 터치 타겟이 44px 이상이다.
- [ ] 입력 변경 후 결과가 100ms 안에 반응한다.
- [ ] 수식은 KaTeX로 렌더링한다.
- [ ] 저작권 침해 자료, 문학 본문, 노래가사, 상표 IP를 사용하지 않는다.
- [ ] 선수학습 링크가 실제 존재하는 단원으로 연결된다.
- [ ] `nextUnitIds`가 실제 존재하는 단원으로 연결된다.
- [ ] 세부 콘텐츠에는 출처 refs와 3문항 미니 문제가 있다.
- [ ] UnitBlueprint에는 공식 출처 locator/evidence와 engineData가 있다.
- [ ] Pattern engine registry에 renderer가 등록되어 있다.
- [ ] 초등 대상 단원은 어려운 한자어를 풀어 쓴다.
- [ ] `npm run audit:completion`에서 blocker가 0개다.
- [ ] `npm run audit:content`에서 blocker가 0개다.
- [ ] `npm run audit:blueprint`에서 blocker가 0개다.
- [ ] `npm run audit:interaction`에서 blocker가 0개다.

## 4. 프롬프트 템플릿

### 단원 개선

```text
단원 ID: M9-CR-03
목표: 기존 단원 페이지와 인터랙티브를 현재 primitive 패턴에 맞게 개선
확인:
- docs/00-MASTER-INDEX.md의 단원 정보
- lib/curriculum/index.ts와 overrides.ts의 메타데이터
- lib/unit-content/의 세부 학습자료
- lib/unit-blueprints/index.ts의 blueprint/engineData
- components/interactive/pattern-engines/SliderGraphPatternEngine.tsx
- app/(units)/grade-9/math/M9-CR-03/page.tsx
검증:
- npm run validate
- npm run audit:completion
- npm run audit:content
- npm run audit:blueprint
- npm run audit:interaction
- npm run tsc
- npm test
```

### Figma 반영

```text
Figma 링크/캡처/token export 기준으로 홈, 헤더, 검색 모달, 단원 페이지 UI를 반영한다.
Stitch 결과물은 참고 시안으로만 사용한다.
docs/design/figma-stitch-handoff.md의 capture/token checklist를 먼저 채운다.
검증:
- npm run lint:md
- npm run validate
- npm run audit:completion
- npm run audit:content
- npm run audit:blueprint
- npm run audit:interaction
- npm run tsc
- npm test
- npm run test:e2e
```

## 5. GitHub 운영

- 스프린트 단위로 PR을 만든다.
- CI가 모두 통과해야 머지한다.
- 공개 저장소 기본 문서(README, LICENSE, LICENSE-CONTENT, SECURITY, CONTRIBUTING)를 유지한다.
- Dependabot PR은 lockfile과 보안 advisory를 확인한 뒤 처리한다.

## 6. 막히면 볼 곳

- 현재 진행률: `docs/PROGRESS.md`
- 완료 감사 기준: `docs/COMPLETION-AUDIT.md`
- 아키텍처: `docs/01-architecture.md`
- 컴포넌트 패턴: `docs/02-component-catalog.md`
- 모바일 검증: `docs/MOBILE-CHECKLIST.md`
