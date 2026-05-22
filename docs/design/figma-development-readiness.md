# Figma Development Readiness Review

**Last verified:** 2026-05-22  
**Decision context:** 배포 직전, 앞으로 Figma 중심으로 개발/디자인 handoff를 운영한다.  
**Verdict:** 현재 코드 구조는 Figma 개발 체계와 잘 맞는다. 단, Figma 파일 자체가 아직 repo에 연결되어 있지 않다면 배포 전 handoff governance가 blocker다.

---

## 1. 결론부터

```text
현재 repo 상태
├─ Figma 친화적인 부분
│  ├─ 공통 primitives가 있음
│  ├─ CSS token 구조가 있음
│  ├─ 단원 페이지 구조가 통일됨
│  ├─ 20개 pattern engine이 registry로 묶임
│  ├─ desktop/mobile e2e가 있음
│  └─ content/blueprint/interaction audit가 있음
│
└─ 배포 전 잠가야 하는 부분
   ├─ Figma file/frame URL
   ├─ Figma variable collection
   ├─ component naming contract
   ├─ Ready for dev status workflow
   ├─ Dev Mode annotations
   ├─ Code Connect 대상 component 목록
   └─ Figma screenshot 대 실제 구현 비교 절차
```

**판단:**  
Figma로 개발하는 방향은 맞다. 특히 이 프로젝트는 392개 단원 전체를 직접 디자인하는 방식이 아니라, **소수의 reusable UI surface + 20개 pattern engine + 단원별 데이터**로 확장하는 구조라서 Figma component/variable/Dev Mode 방식과 궁합이 좋다.

다만 Figma를 “느낌 참고용”으로 쓰면 다시 무너진다. Figma는 최종 시안 저장소가 아니라 **디자인 계약의 source of truth**로 써야 한다.

---

## 2. 공식 Figma 문서 기준으로 확인한 핵심

### 2.1 Dev Mode

Figma Dev Mode는 개발자가 디자인 파일을 inspect하고, 변경 이력을 비교하고, Ready for dev 상태와 annotation을 보고, GitHub/Storybook 같은 개발 워크플로와 연결하는 handoff 표면이다.

이 프로젝트에 필요한 해석:

```text
Figma Dev Mode
├─ Inspect
│  ├─ spacing
│  ├─ typography
│  ├─ color
│  ├─ code snippets
│  └─ component variants
│
├─ Ready for dev
│  ├─ 개발 가능한 frame/component 표시
│  ├─ 변경 발생 시 Changed 상태 추적
│  └─ focus view로 특정 frame만 검토
│
├─ Annotations
│  ├─ Development notes
│  ├─ Interaction notes
│  ├─ Accessibility notes
│  └─ Content notes
│
└─ Compare changes
   ├─ frame version history
   ├─ 변경된 layer 확인
   └─ 구현 diff 판단 근거
```

**적합성:** 높음.  
현재 repo는 surface가 명확하므로 Ready for dev frame 단위와 잘 맞는다.

### 2.2 Variables와 design tokens

Figma Dev Mode는 color, number, string, boolean variables를 inspect할 수 있고, variable mode와 alias chain을 확인할 수 있다. 또한 raw value가 있을 때 대응 가능한 suggested variable을 확인할 수 있다.

이 프로젝트에 필요한 해석:

```text
Figma variables
├─ primitive tokens
│  ├─ color/blue/500
│  ├─ color/green/500
│  ├─ space/4
│  └─ radius/2
│
├─ semantic tokens
│  ├─ surface/app/background
│  ├─ text/default
│  ├─ border/default
│  └─ action/primary/background
│
├─ component tokens
│  ├─ unit/header/title
│  ├─ search/result/hover
│  ├─ engine/control/height
│  └─ card/padding/x
│
└─ modes
   ├─ light
   ├─ dark
   └─ high-contrast, optional future
```

**적합성:** 중간~높음.  
현재 `app/globals.css`에 CSS variable 기반 토큰이 있으므로 연결 가능하다. 하지만 Figma variable collection이 실제로 존재하고 이름이 code token과 맞는지는 아직 확인해야 한다.

### 2.3 Code Connect

Figma Code Connect는 Figma component와 실제 code component를 연결한다. React에서는 props, enum, boolean, text content, slots, nested instances, variant restrictions를 매핑할 수 있다.

이 프로젝트에 필요한 해석:

```text
Code Connect target priority
├─ Tier 1: primitives
│  ├─ SiteHeader
│  ├─ SearchDialog
│  ├─ SectionCard
│  ├─ UnitHeader
│  ├─ UnitProgressBadge
│  └─ UnitProgressControls
│
├─ Tier 2: learning surfaces
│  ├─ UnitLearningMaterial
│  ├─ MiniQuiz block
│  ├─ Example block
│  └─ Source block
│
├─ Tier 3: pattern engine shells
│  ├─ PatternEngineScaffold
│  ├─ SliderGraphPatternEngine
│  ├─ DataVisualizationPatternEngine
│  └─ MatchingQuizPatternEngine
│
└─ Tier 4: full pages
   ├─ Home
   ├─ Unit page
   ├─ Search result state
   └─ Roadmap/progress view
```

**적합성:** 높음 for primitives, 중간 for pattern engines.  
Pattern engines는 시각화 로직이 많아서 Figma component를 그대로 code snippet으로 바꾸기보다, shell/controls/layout까지만 Code Connect하고 내부 visualization은 engine contract로 유지하는 것이 맞다.

### 2.4 Figma MCP

Figma MCP server는 디자인 context를 AI 도구와 IDE로 가져오는 통로다. 공식 문서상 remote MCP server와 desktop MCP server 방식이 있고, Code Connect가 있으면 실제 code component context를 더 정확히 제공할 수 있다.

이 프로젝트에 필요한 해석:

```text
Figma MCP use
├─ 좋은 사용
│  ├─ 특정 frame URL을 기준으로 구현 범위 지정
│  ├─ variables/components/layout context 추출
│  ├─ Code Connect된 primitives 우선 재사용
│  └─ screenshot과 구현 결과 비교
│
└─ 위험한 사용
   ├─ Figma 전체 파일을 막연히 구현하라고 지시
   ├─ placeholder 이미지/텍스트를 production data로 혼입
   ├─ design token 이름 없이 raw CSS 값만 복사
   └─ generated code를 검토 없이 붙여넣기
```

**적합성:** 조건부.  
Figma MCP/Code Connect가 연결되면 매우 적합하다. 연결이 없다면 현재 문서화된 Figma link/capture/token export 절차를 써야 한다.

---

## 3. 현재 시스템이 Figma 체계에 맞는 이유

### 3.1 단원 페이지가 하나의 디자인 문법으로 통일됨

```text
Figma component system
  ↓
Unit page template
  ↓
392 generated pages
```

현재 단원 페이지는 같은 구조를 쓴다.

```text
Unit Page
├─ UnitHeader
├─ UnitProgressControls
├─ UnitLearningMaterial
├─ InteractiveErrorBoundary
├─ UnitInteractiveRenderer
└─ PrerequisiteList / Next CTA
```

이 구조는 Figma에서 한 번 제대로 설계하면 392개 단원 전체에 적용할 수 있다.  
즉, Figma 작업의 ROI가 크다.

### 3.2 20개 pattern engine은 Figma component taxonomy와 잘 맞음

```text
20 pattern engines
├─ layout shell
├─ controls
├─ visualization area
├─ result/feedback area
└─ reset/action area
```

Figma에서는 engine 내부 수학/물리 계산을 디자인하지 않는다. 대신 아래를 디자인한다.

```text
Figma에서 확정할 것
├─ engine shell 크기
├─ control density
├─ result panel 위치
├─ mobile stacking
├─ focus/hover/active state
├─ empty/loading/error state
└─ subject color 사용 규칙
```

Code에서는 아래를 유지한다.

```text
Code에서 유지할 것
├─ engineData schema
├─ interaction state
├─ SVG/canvas drawing
├─ feedback rules
└─ audit/e2e contract
```

이 분업이 합리적이다.

### 3.3 데이터와 디자인이 분리되어 있음

```text
Figma
└─ surface, layout, visual state, component variants

Repo data
└─ 공식 출처, 단원 metadata, 학습 원고, 문제, 해설, engineData
```

이 분리는 매우 중요하다. Figma 안의 예시 텍스트는 production 학습 데이터가 아니다.  
현재 repo는 UnitContent/UnitBlueprint를 따로 갖고 있으므로 Figma mock text가 실제 데이터로 섞일 위험을 줄인다.

---

## 4. 배포 전 Figma blocker

아래는 배포 전에 반드시 결정해야 한다.

```text
Figma Pre-Deploy Blockers
├─ B1. Figma file URL이 README/docs에 없다
├─ B2. Ready for dev 처리된 frame 목록이 없다
├─ B3. token export와 CSS variables의 대응표가 검증되지 않았다
├─ B4. component naming이 code primitive와 맞지 않는다
├─ B5. desktop/mobile-360 frame이 모두 없다
├─ B6. interaction/accessibility annotation이 없다
├─ B7. Code Connect 적용 범위가 정해지지 않았다
└─ B8. Figma 변경 이후 구현 screenshot 비교 절차가 없다
```

현재 repo만 보면 B1~B8은 문서상 절차는 있지만 실제 Figma 파일 링크가 없으므로 **아직 완료로 볼 수 없다**.

---

## 5. 배포 직전 Figma checklist

### 5.1 Figma 파일 구조

```text
Figma file
├─ 00 Cover
│  └─ product summary, source-of-truth notice
│
├─ 01 Foundations
│  ├─ Color variables
│  ├─ Typography variables
│  ├─ Spacing variables
│  ├─ Radius variables
│  └─ Shadow variables
│
├─ 02 Components
│  ├─ Navigation
│  ├─ Search
│  ├─ Unit
│  ├─ Progress
│  ├─ Content
│  └─ PatternEngine
│
├─ 03 App Surfaces
│  ├─ Home
│  ├─ SearchDialog
│  ├─ UnitPage
│  ├─ ProgressDashboard
│  └─ RoadmapPreview
│
├─ 04 Pattern Engines
│  ├─ slider-graph
│  ├─ step-animation
│  ├─ classification-sort
│  └─ ... 20 total
│
└─ 05 Handoff
   ├─ Ready for dev frames
   ├─ annotations
   ├─ before/after captures
   └─ known exceptions
```

### 5.2 Required frames

```text
Required before deployment
├─ Home / Desktop / Light / Default
├─ Home / Mobile-360 / Light / Default
├─ SearchDialog / Desktop / Light / Results
├─ SearchDialog / Mobile-360 / Light / Results
├─ Unit M9-CR-03 / Desktop / Light / Default
├─ Unit M9-CR-03 / Mobile-360 / Light / Default
├─ Unit M9-CR-03 / Desktop / Dark / Default, optional
├─ Unit M9-CR-03 / Mobile-360 / Dark / Default, optional
├─ PatternEngine / Desktop / Light / 20 representatives
└─ PatternEngine / Mobile-360 / Light / 20 representatives
```

### 5.3 Variables required before code changes

```text
Variables
├─ color
│  ├─ surface/*
│  ├─ text/*
│  ├─ border/*
│  ├─ action/*
│  ├─ state/*
│  └─ subject/*
│
├─ typography
│  ├─ font/family/*
│  ├─ font/size/*
│  ├─ font/weight/*
│  └─ line-height/*
│
├─ spacing
│  ├─ space/1
│  ├─ space/2
│  ├─ space/3
│  ├─ space/4
│  ├─ space/6
│  ├─ space/8
│  └─ component-specific aliases
│
├─ radius
│  ├─ radius/sm
│  ├─ radius/md
│  └─ radius/lg
│
└─ motion
   ├─ duration/fast
   ├─ duration/base
   └─ easing/standard
```

### 5.4 Annotation requirements

Each Ready for dev frame should include:

```text
Annotations
├─ Development
│  ├─ code surface
│  ├─ changed behavior
│  └─ token exceptions
│
├─ Interaction
│  ├─ hover/focus/active
│  ├─ keyboard behavior
│  ├─ loading/error
│  └─ mobile gestures
│
├─ Accessibility
│  ├─ heading order
│  ├─ aria labels
│  ├─ contrast notes
│  └─ touch target notes
│
└─ Content
   ├─ production data source
   ├─ placeholder disclaimer
   └─ copy freeze note
```

---

## 6. Code Connect recommendation

Do not connect everything at once.

```text
Phase 1: primitives
├─ SiteHeader
├─ SearchDialog
├─ SectionCard
├─ UnitHeader
├─ UnitProgressBadge
└─ UnitProgressControls

Phase 2: unit learning surfaces
├─ UnitLearningMaterial
├─ Example block
├─ MiniQuiz block
├─ AnswerExplanation block
└─ SourceReference block

Phase 3: pattern engine shells
├─ PatternEngineScaffold
├─ SliderGraphPatternEngine
├─ MatchingQuizPatternEngine
├─ DataVisualizationPatternEngine
└─ others only after shell contract stabilizes
```

Why:

```text
High ROI first
  -> primitives appear everywhere
  -> Figma snippets become useful quickly
  -> fewer mapping exceptions
  -> less risk before deployment
```

---

## 7. Fit/gap matrix

| Area | Current repo fit | Risk | Pre-deploy action |
|------|------------------|------|-------------------|
| Token system | Medium-high | Figma variable names may drift from CSS vars | Export variables and map to `app/globals.css` |
| Components | High | Figma components may not match code primitives | Lock naming table and Code Connect Tier 1 |
| Unit template | High | Figma may design one-off pages | Use one UnitPage template and representative states |
| Pattern engines | Medium-high | Figma may over-design internal visualization details | Design shell/controls/states, keep engine logic in code |
| Data authenticity | High | Figma placeholder text may be mistaken for production copy | Annotate placeholders and keep UnitContent as source |
| Mobile | Medium | Figma mobile frames may not cover engine controls | Require mobile-360 frames for representative engines |
| Accessibility | Medium | Visual frames may miss keyboard/ARIA details | Use annotation categories and manual checklist |
| Visual regression | Medium-low | No automated Figma screenshot diff yet | Add manual screenshot comparison before deploy |
| Dev handoff | Medium | No actual Figma file URL in repo | Add Figma source link once available |

---

## 8. What to do before deploy

```text
Before deployment
├─ 1. Put canonical Figma file link in README or private release notes
├─ 2. Mark required frames Ready for dev
├─ 3. Export variables and compare with `app/globals.css`
├─ 4. Confirm desktop/mobile-360 frames for core surfaces
├─ 5. Add Dev Mode annotations for behavior/accessibility/content
├─ 6. Choose Code Connect Tier 1 component list
├─ 7. Capture implemented app screenshots
├─ 8. Compare Figma captures vs Playwright/app captures
├─ 9. Run full verification
└─ 10. Only then deploy
```

Full verification:

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:content
npm run audit:blueprint
npm run audit:interaction
npm run audit:security
npm run secret-grep
npm run tsc
npm test
npm run build
npm run test:e2e
```

---

## 9. Practical development workflow

```text
Figma-driven implementation loop

Designer
  ├─ updates component/frame
  ├─ binds variables
  ├─ adds annotations
  └─ marks Ready for dev

Developer
  ├─ opens Dev Mode
  ├─ checks variables and annotations
  ├─ compares changes if frame changed
  ├─ updates code tokens/primitives first
  ├─ updates page/engine only if needed
  ├─ runs verification
  └─ marks implementation complete in PR

Reviewer
  ├─ compares app screenshot to Figma
  ├─ checks mobile 360px
  ├─ checks source/data integrity
  └─ approves deploy
```

---

## 10. Strategic recommendation

Use Figma as a **controlled interface contract**, not a loose mood board.

```text
Good
├─ Figma defines reusable UI surfaces
├─ Figma variables map to CSS vars
├─ Code Connect maps high-use primitives
├─ annotations define behavior and accessibility
└─ repo audits protect data/rendering integrity

Bad
├─ Figma generates arbitrary one-off code
├─ raw colors copied into components
├─ placeholder text copied into UnitContent
├─ mobile states skipped
└─ design changes shipped without compare/change review
```

This repo is ready to become Figma-driven, but deployment should wait until the canonical Figma file, ready-for-dev frames, and token mapping are locked.

---

## 11. Official references

- Figma Dev Mode guide: https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode
- Variables in Dev Mode: https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode
- Modes for variables: https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables
- Dev Mode annotations and measurements: https://help.figma.com/hc/en-us/articles/20774752502935-Add-measurements-and-annotate-designs-in-Dev-Mode
- Dev Mode Ready for dev view: https://help.figma.com/hc/en-us/articles/23918228264855-Dev-Mode-ready-for-dev-view
- Compare changes in Dev Mode: https://help.figma.com/hc/en-us/articles/15023193382935-Compare-changes-in-Dev-Mode
- Code Connect overview: https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect
- Code Connect developer docs: https://developers.figma.com/docs/code-connect
- React Code Connect docs: https://developers.figma.com/docs/code-connect/react/
- Code Connect UI setup: https://developers.figma.com/docs/code-connect/code-connect-ui-setup/
- Figma MCP server guide: https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server
- Figma REST API variables: https://developers.figma.com/docs/rest-api/variables/

