# Product Strategy: 초3~고3 인터랙티브 교육 플랫폼

**Last verified:** 2026-05-22  
**Current implementation:** 392 verified active units, 20 pattern engines, 0 legacy renderers  
**Expansion stance:** 488개 목표 중 추가 96개는 공식 출처 locator/evidence 확보 전까지 앱 데이터에 넣지 않는다.

---

## 1. 한 문장으로 무엇인가

이 저장소는 한국 초3~고3의 주요 5과목 교육과정 단원을 **읽는 목차**가 아니라 **조작 가능한 개념 학습 시스템**으로 바꾸는 플랫폼이다.

핵심은 다음이다.

```text
공식 교육과정 단원
  -> 검증 가능한 UnitBlueprint
  -> 단원별 맞춤 학습 원고
  -> 20개 패턴엔진 중 하나로 렌더링
  -> 학생이 직접 조작하고 확인하는 학습 화면
```

즉, 이 프로젝트는 “많은 페이지를 만든 웹사이트”가 아니라 **출처 검증, 콘텐츠 구조화, 인터랙션 렌더링, 감사 자동화가 연결된 교육 운영체제**다.

---

## 2. 가치가 있나?

있다. 단, 가치는 “392개를 많이 만들었다”가 아니라 **대규모 교육 콘텐츠를 신뢰 가능하고 반복 생산 가능한 시스템으로 만든 것**에 있다.

### 2.1 기존 문제

대부분의 교육 콘텐츠 프로젝트는 아래 네 가지 중 하나에서 무너진다.

```text
1. 데이터 신뢰성 붕괴
   - 출처 없는 단원 추가
   - 임의 ID, 임의 목차, 임의 설명
   - 나중에 무엇이 공식이고 무엇이 가짜인지 구분 불가

2. 콘텐츠 생산성 붕괴
   - 단원마다 사람이 새 화면을 직접 만듦
   - 100개를 넘으면 유지보수 불가능
   - 같은 설명 구조, 같은 문제 구조가 제각각 흩어짐

3. 인터랙션 확장성 붕괴
   - 한 단원에만 예쁜 데모가 있음
   - 나머지는 정적 텍스트나 placeholder
   - “인터랙티브 플랫폼”이라고 하지만 실제로는 샘플 몇 개뿐

4. 검증 체계 붕괴
   - 빌드는 되지만 단원이 빠져 있음
   - 페이지는 있지만 출처가 없음
   - 테스트는 있지만 학생 화면 품질은 보지 않음
```

이 구현은 네 문제를 각각 시스템 레벨에서 막는다.

```text
데이터 신뢰성   -> source ledger + source refs + audit:blueprint
콘텐츠 생산성   -> authored UnitContent builder + UnitBlueprint contract
인터랙션 확장성 -> 20 pattern engines + registry + representative e2e
검증 체계       -> validate + completion/content/blueprint/interaction audits + unit/e2e
```

### 2.2 현재 만든 것의 실제 가치

```text
┌─────────────────────────────────────────────────────────────┐
│                        제품 가치                             │
├─────────────────────────────────────────────────────────────┤
│ 학생 입장                                                    │
│ - 단원을 읽는 대신 조작하면서 이해한다.                      │
│ - 모든 단원이 같은 학습 순서로 열려 길을 잃지 않는다.         │
│ - 예시, 미니문제, 해설, 오개념, 실생활 적용이 한 화면에 있다. │
├─────────────────────────────────────────────────────────────┤
│ 교사/운영자 입장                                             │
│ - 단원 수, 출처, 라우트, 콘텐츠 누락을 자동으로 감사한다.     │
│ - 미검증 단원을 제품 데이터에 섞지 않는다.                    │
│ - 20개 엔진으로 단원 유형을 분류해 확장 비용을 낮춘다.        │
├─────────────────────────────────────────────────────────────┤
│ 개발자 입장                                                  │
│ - 새 단원은 page를 직접 짜는 대신 blueprint와 engineData로 연결한다. │
│ - renderer fallback을 허용하지 않아 누락이 즉시 드러난다.     │
│ - 대표 단원 E2E로 20개 엔진의 실제 화면을 계속 검증한다.      │
├─────────────────────────────────────────────────────────────┤
│ 사업/전략 입장                                               │
│ - 초3~고3 5과목을 하나의 구조로 다루는 확장 기반이 생긴다.    │
│ - 공식 출처 기반이라 B2B, 학교, 학원, 공공 제휴에 설명 가능하다. │
│ - 콘텐츠 제작, 검수, 배포, 회귀 테스트의 운영 비용을 줄인다.  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 전체가 다루는 내용

현재 앱의 검증 대상은 392개 활성 단원이다.

```text
전체 범위
├─ 학년 범위
│  ├─ 초등
│  ├─ 중등
│  ├─ 초·중 공통
│  ├─ 고등 공통
│  ├─ 고등 일반선택
│  ├─ 고등 진로선택
│  └─ 고등 융합선택
│
├─ 과목 범위
│  ├─ 수학
│  ├─ 과학
│  ├─ 사회
│  ├─ 국어
│  └─ 영어
│
├─ 학습 구성
│  ├─ 3분 훑어보기
│  ├─ 쉬운 설명
│  ├─ 표준 설명
│  ├─ 심화 설명
│  ├─ 예시 3개
│  ├─ 조작형 인터랙션
│  ├─ 미니문제 3개
│  ├─ 정답
│  ├─ 해설
│  ├─ 오개념
│  ├─ 실생활 적용
│  ├─ 출처
│  └─ 다음 단원 이동
│
└─ 시스템 구성
   ├─ Unit metadata
   ├─ UnitContent
   ├─ UnitBlueprint
   ├─ Pattern engine registry
   ├─ Generated unit pages
   ├─ Audits
   └─ E2E tests
```

### 3.1 과목별 커버리지

```text
392 verified active units
├─ 수학     138
├─ 과학     104
├─ 사회      75
├─ 국어      41
└─ 영어      34
```

### 3.2 학교급별 커버리지

```text
392 verified active units
├─ 초등             96
├─ 중등             71
├─ 초·중 공통       38
├─ 고등 공통        62
├─ 고등 일반선택    58
├─ 고등 진로선택    47
└─ 고등 융합선택    20
```

---

## 4. 제품이 하려는 일

이 플랫폼은 “교과서 PDF를 웹에 옮기는 것”이 아니다.

목표는 아래 구조다.

```text
학생의 실제 학습 순간

모른다
  ↓
짧게 본다
  ↓
손으로 바꿔 본다
  ↓
결과를 예측한다
  ↓
정답과 해설로 확인한다
  ↓
오개념을 고친다
  ↓
비슷한 상황에 적용한다
  ↓
다음 단원으로 이동한다
```

이를 화면 구조로 바꾸면 다음과 같다.

```text
Unit Page
├─ UnitHeader
│  ├─ 과목
│  ├─ 학교급/학년
│  ├─ 영역
│  └─ 단원 제목
│
├─ UnitLearningMaterial
│  ├─ 3분 훑어보기
│  ├─ 설명 3단계
│  ├─ 예시 3개
│  ├─ 미니문제 3개
│  ├─ 정답/해설
│  ├─ 오개념
│  ├─ 실생활 적용
│  └─ 출처
│
├─ InteractiveErrorBoundary
│  └─ UnitInteractiveRenderer
│     └─ PatternEngine
│
└─ Prerequisite / Next CTA
```

---

## 5. 왜 20개 패턴엔진인가

392개 단원마다 별도 React 컴포넌트를 만들면 장기적으로 망가진다. 반대로 하나의 컴포넌트로 모든 과목을 처리하면 학습 경험이 빈약해진다.

그래서 중간 해법은 **20개 패턴엔진 + 단원별 데이터**다.

```text
나쁜 방식 A: 392개 개별 컴포넌트
└─ 품질은 낼 수 있지만 유지보수와 검수가 폭발함

나쁜 방식 B: 1개 범용 템플릿
└─ 유지보수는 쉽지만 수학/과학/사회/언어 학습 차이를 못 살림

현재 방식: 20개 엔진 + UnitBlueprint
├─ 반복 가능한 화면 문법
├─ 과목별 개념 차이 반영
├─ 감사 가능한 데이터 구조
└─ 대표 단원 E2E로 회귀 방지
```

### 5.1 20개 엔진 목록

```text
Pattern Engines
├─ 01 slider-graph
├─ 02 step-animation
├─ 03 classification-sort
├─ 04 particle-simulation
├─ 05 solid-3d
├─ 06 geometry-construction
├─ 07 timeline
├─ 08 map-explorer
├─ 09 network-builder
├─ 10 probability-simulation
├─ 11 matching-quiz
├─ 12 transformation-converter
├─ 13 tree-builder
├─ 14 data-visualization
├─ 15 calculus-visualization
├─ 16 molecular-3d
├─ 17 astronomy-simulation
├─ 18 vector-matrix
├─ 19 biology-mechanism
└─ 20 economics-finance
```

### 5.2 엔진이 맡는 개념 유형

```text
수량이 변한다
  ├─ slider-graph
  ├─ data-visualization
  ├─ calculus-visualization
  └─ economics-finance

절차가 있다
  ├─ step-animation
  ├─ biology-mechanism
  └─ transformation-converter

분류가 중요하다
  ├─ classification-sort
  ├─ matching-quiz
  └─ tree-builder

공간 구조가 중요하다
  ├─ geometry-construction
  ├─ solid-3d
  ├─ vector-matrix
  └─ molecular-3d

시스템 관계가 중요하다
  ├─ network-builder
  ├─ particle-simulation
  ├─ probability-simulation
  ├─ map-explorer
  ├─ timeline
  └─ astronomy-simulation
```

---

## 6. 데이터 정직성 전략

이 프로젝트에서 가장 중요한 원칙은 **가짜 숫자를 만들지 않는 것**이다.

현재 목표가 488개라고 해서 488개를 앱에 넣지 않았다. 공식 출처 locator와 evidence가 없는 96개는 blocked 상태로 문서에만 둔다.

```text
488 long-term target
├─ 392 verified rows
│  ├─ app metadata 포함
│  ├─ UnitContent 포함
│  ├─ UnitBlueprint 포함
│  ├─ generated route 포함
│  └─ audits 통과
│
└─ 96 blocked rows
   ├─ 앱 데이터 미포함
   ├─ 공식 locator 미확보
   ├─ evidence text 미확보
   └─ verified target에 미반영
```

### 6.1 왜 이게 중요한가

교육 제품은 “그럴듯한 목차”가 가장 위험하다.

```text
그럴듯한 데이터
  -> 제품 데모는 쉬움
  -> 실제 도입/검수에서 출처 문제 발생
  -> 콘텐츠 수정 비용 폭발
  -> 신뢰도 하락

검증된 데이터
  -> 초기 속도는 느림
  -> 감사 가능
  -> 학교/기관/학원에 설명 가능
  -> 장기 운영 가능
```

---

## 7. 아키텍처

현재 구조는 아래처럼 단방향으로 흐른다.

```text
docs/00-MASTER-INDEX.md
        │
        ▼
lib/curriculum/*
        │
        ▼
lib/unit-content/authored.ts
        │
        ▼
lib/unit-blueprints/index.ts
        │
        ├───────────────┐
        │               │
        ▼               ▼
app/(units)/*        components/interactive/pattern-engines/*
        │               │
        └──────┬────────┘
               ▼
        UnitInteractiveRenderer
               │
               ▼
          학생 단원 화면
```

### 7.1 단원 데이터 구조

```text
Unit
├─ curriculum metadata
│  ├─ unitId
│  ├─ subject
│  ├─ schoolLevel
│  ├─ gradeBand
│  ├─ domain/course
│  └─ route path
│
├─ UnitContent
│  ├─ sourceRefs
│  ├─ simple explanation
│  ├─ standard explanation
│  ├─ advanced explanation
│  ├─ examples
│  ├─ miniQuiz
│  ├─ answer explanations
│  ├─ common mistakes
│  ├─ real-life applications
│  └─ nextUnitIds
│
├─ UnitBlueprint
│  ├─ source
│  ├─ content
│  ├─ interaction
│  ├─ contentHints
│  ├─ engineData
│  └─ implementationStatus
│
└─ Rendered Page
   ├─ header
   ├─ learning material
   ├─ pattern engine
   └─ navigation
```

---

## 8. 운영 전략

### 8.1 새 단원을 추가할 때

```text
새 단원 후보 발견
  ↓
공식 출처 확인
  ↓
locator + evidence text 기록
  ↓
source ledger 업데이트
  ↓
curriculum metadata 추가
  ↓
UnitContent authored data 생성
  ↓
UnitBlueprint 생성
  ↓
engine 선택 및 engineData 작성
  ↓
page generation
  ↓
audits + tests + build + e2e
  ↓
verified target 증가
```

중간에 공식 출처가 없으면 흐름은 멈춘다.

```text
공식 locator 없음
  ↓
blocked row
  ↓
앱 데이터 미반영
  ↓
감사 목표 수 미증가
```

### 8.2 새 엔진을 개선할 때

```text
엔진 개선
  ↓
PatternEngineProps 유지
  ↓
registry mapping 유지
  ↓
대표 단원 E2E 갱신
  ↓
mobile 360px 확인
  ↓
audit:interaction 통과
```

---

## 9. 검증 체계

검증은 “잘 될 것 같다”가 아니라 “깨지면 실패한다”로 설계한다.

```text
Quality Gates
├─ validate
│  └─ curriculum count, routes, nextUnitId integrity
│
├─ audit:completion
│  └─ active units, pages, public docs, generated stubs
│
├─ audit:content
│  └─ UnitContent, examples, quiz, answers, mistakes, applications
│
├─ audit:blueprint
│  └─ source provenance, authored content, source locator/evidence
│
├─ audit:interaction
│  └─ engine registry, engineData, mobile criteria, representative e2e
│
├─ tsc
│  └─ type-level correctness
│
├─ unit tests
│  └─ blueprint and engine contract assertions
│
├─ build
│  └─ Next static generation
│
└─ e2e
   └─ M9 regression + 20 pattern engine representative units
```

### 9.1 현재 확인된 통과 명령

```bash
npm run validate
npm run audit:completion
npm run audit:content
npm run audit:blueprint
npm run audit:interaction
npm run tsc
npm test
npm run build
npm run test:e2e
npm run audit:security
npm run secret-grep
npm run lint:md
```

---

## 10. 전략적으로 무엇을 만들고 있는가

장기적으로 이 프로젝트는 다음 다섯 가지 자산을 만든다.

```text
Strategic Assets
├─ 1. 공식 출처 기반 교육과정 데이터 자산
├─ 2. 단원별 학습 원고 생성/검수 체계
├─ 3. 20개 인터랙티브 개념 렌더링 엔진
├─ 4. 대규모 단원 회귀 테스트 파이프라인
└─ 5. 학교급/과목/영역을 넘는 학습 경로 그래프
```

### 10.1 Figma-driven development 전략

배포 직전부터 Figma를 개발 기준으로 쓴다면, Figma는 mood board가 아니라 interface contract가 되어야 한다.

```text
Figma source of truth
├─ variables
│  └─ app/globals.css token으로 반영
├─ components
│  └─ components/primitives/*와 Code Connect 후보
├─ Ready for dev frames
│  └─ 구현 대상 surface 확정
├─ Dev Mode annotations
│  └─ interaction/accessibility/content 요구사항 기록
└─ screenshots
   └─ Playwright/app capture와 배포 전 비교
```

Figma 개발 적합성 검토와 배포 전 blocker는 `docs/design/figma-development-readiness.md`에 정리되어 있다.

### 10.2 사업적으로 가능한 방향

```text
B2C
├─ 학생용 개념 학습 앱
├─ 오늘의 학습 큐
├─ 복습 큐
└─ 진도 기반 추천

B2B
├─ 학원용 단원별 개념 시각화 도구
├─ 교사용 수업 보조 자료
├─ 학교급별 커리큘럼 맵
└─ 기관용 검증 가능한 교육 콘텐츠 라이브러리

Content Platform
├─ 공식 출처 기반 단원 ledger
├─ 단원별 authored material
├─ pattern engine marketplace
└─ 검수/승인 workflow
```

### 10.3 기술적으로 가능한 방향

```text
Next phase
├─ 더 정밀한 official locator 수집
├─ 96 blocked rows 검증 후 점진 활성화
├─ 엔진별 고급 interaction 추가
├─ adaptive practice
├─ spaced repetition
├─ teacher dashboard
├─ class assignment flow
├─ learning analytics
└─ source review workflow
```

---

## 11. 현재 한계

가치가 있어도 한계는 분명히 적어야 한다.

```text
Current Limits
├─ 488개 전체가 검증 완료된 상태는 아니다.
│  └─ 현재 verified target은 392다.
│
├─ 20개 엔진은 실제 renderer지만, 엔진별 심화 물리/수학 모델은 아직 확장 여지가 있다.
│  └─ 예: molecular-3d, astronomy-simulation, solid-3d는 현재 lightweight visual renderer다.
│
├─ 단원 원고는 authored blueprint data로 구조화됐지만, 교사/전문가 감수는 별도 단계다.
│
├─ 공식 출처 ledger는 앱 단원 유지 근거를 기록하지만, 추가 96개를 공식 row로 승격하려면 더 촘촘한 locator 수집이 필요하다.
│
└─ 학생 개인화, 학급 운영, 평가 리포트는 아직 제품 기능으로 완성된 범위가 아니다.
```

이 한계를 숨기지 않는 것이 이 프로젝트의 신뢰성이다.

---

## 12. 결론

현재 만든 것은 “완성된 모든 교육 서비스”가 아니다. 그러나 **대규모 인터랙티브 교육 서비스로 갈 수 있는 핵심 골격**은 만들었다.

```text
지금 만든 것
├─ 392개 verified active units
├─ 392개 unified learning pages
├─ authored UnitContent
├─ source provenance contract
├─ UnitBlueprint registry
├─ 20 real pattern engines
├─ no legacy renderer path
├─ source ledger
├─ audits
├─ tests
└─ e2e coverage

아직 남은 것
├─ 96 blocked candidates official verification
├─ expert content review
├─ deeper engine models
├─ personalization
├─ teacher/admin workflows
└─ production analytics
```

따라서 이 프로젝트의 정확한 정의는 다음이다.

> 공식 출처 기반 초3~고3 5과목 단원을, 대규모로 검증 가능하고 확장 가능한 인터랙티브 학습 화면으로 운영하기 위한 제품/콘텐츠/렌더링/감사 시스템.
