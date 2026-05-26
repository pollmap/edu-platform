# Figma/Stitch 프론트엔드 핸드오프

**Last Updated:** 2026-05-22

이 문서는 첫 리디자인 스프린트의 기준 문서다. 제품 UX 기준은 `docs/design/product-ux-foundation.md`이며, 기본 방향은 **Light-first 인터랙티브 학습 맵**이다. Google Stitch는 빠른 화면 시안과 변형 탐색용으로 쓰고, Figma를 최종 디자인 기준으로 둔다. 코드 반영은 Figma 링크, Dev Mode inspect 정보, 화면 캡처, token export를 받은 뒤 진행한다. 현재 작업 환경에는 Figma 직접 커넥터/MCP가 연결되어 있지 않으므로, 실제 Figma 파일이 제공되기 전에는 이 문서와 `figma-development-readiness.md`의 체크리스트로 handoff를 검증한다.

브랜드 비주얼은 `하루배움` 로고와 캐릭터 세트를 기준으로 한다. 사용 가능한 파일과 용도는 `docs/design/brand-assets.md`를 따른다.

## 1. 작업 순서

1. **Stitch에서 초안 생성**
   - 홈, 단원 상세, 검색 모달, 라이트 테마의 시각 방향을 빠르게 만든다.
   - Stitch 산출물은 최종 기준이 아니다. 화면 구조, 밀도, 색감 후보를 고르는 재료로만 사용한다.
2. **Figma에서 최종 정리**
   - Stitch 결과를 Figma로 옮긴 뒤 auto layout, component, variable, mode를 정리한다.
   - Figma frame과 component 이름은 아래 naming 규칙을 따른다.
   - Dev Mode에서 spacing, typography, color token 값을 확인할 수 있어야 한다.
   - 배포 대상 frame/component는 Ready for dev 상태로 표시하고 Development/Interaction/Accessibility/Content annotation을 남긴다.
3. **코드 반영**
   - Figma 링크, 캡처, token export, 변경 범위를 이 문서 체크리스트에 맞춰 확인한다.
   - `app/globals.css`의 `@theme`, `:root`, `.dark`, `va-*` 토큰을 먼저 갱신한다.
   - 이후 `components/primitives/*`와 해당 화면의 page 컴포넌트를 최소 범위로 수정한다.
   - Code Connect가 연결되어 있으면 Dev Mode의 실제 code component mapping을 우선하고, raw generated CSS는 보조 정보로만 사용한다.
4. **검증**
   - 문서/정적 검증: `npm run lint:md`, `npm run validate`, `npm run tsc`
   - 기능 회귀: `npm test`, `npm run test:e2e`
   - 수동 확인: 홈, 검색 모달, slider-graph 대표 단원 `M9-CR-03`, 360px 모바일, 라이트 기본 테마, 다크 보조 테마
   - 배포 직전 Figma 적합성 검토는 `docs/design/figma-development-readiness.md`를 따른다.

## 2. 필수 입력물

| 입력물 | 필수 여부 | 기준 |
|--------|-----------|------|
| Figma 링크 | 필수 | Dev Mode에서 inspect 가능한 file/frame 링크 |
| Ready for dev 상태 | 필수 | 구현 대상 frame/component가 Ready for dev로 표시됨 |
| Dev Mode annotation | 필수 | Development, Interaction, Accessibility, Content 기준 설명 |
| 화면 캡처 | 필수 | desktop/mobile, light 필수, dark 보조 |
| 토큰 export | 필수 | color, typography, spacing, radius의 Figma variable 또는 JSON/CSV |
| 변수 mode/alias 확인 | 필수 | light/dark mode와 alias chain 확인 |
| Code Connect mapping | 권장 | primitives부터 code component 연결 |
| Stitch 링크/캡처 | 선택 | 시안 출처 확인용. 최종 기준으로 사용하지 않음 |
| 변경 설명 | 필수 | 변경할 surface, 유지할 behavior, 접근성 예외 여부 |

## 3. 1차 필수 캡처

1. `Home / Desktop / Light`
2. `Home / Mobile-360 / Light`
3. `Unit / M9-CR-03 / Desktop / Light`
4. `Unit / M9-CR-03 / Mobile-360 / Light`
5. `SearchDialog / Desktop / Light`
6. `SearchDialog / Mobile-360 / Light`
7. `Progress / Desktop / Light`
8. `RoadmapPreview / Desktop / Light`
9. `Home / Desktop / Dark` (보조)
10. `Unit / M9-CR-03 / Desktop / Dark` (보조)

캡처 파일명은 `surface-viewport-mode-state.png` 형식을 쓴다. 예: `home-desktop-light-default.png`, `search-mobile360-dark-empty.png`.

## 4. Figma Naming

### Frame

Frame 이름은 `Surface / Viewport / Mode / State`로 둔다.

예시:

- `Home / Desktop / Light / Default`
- `Home / Mobile-360 / Dark / Default`
- `Unit M9-CR-03 / Desktop / Light / Default`
- `SearchDialog / Desktop / Light / Results`
- `SearchDialog / Mobile-360 / Dark / Empty`

### Component

Component 이름은 코드의 공용 primitive와 맞춘다.

| Figma component | Code reference | 비고 |
|-----------------|----------------|------|
| `Navigation/SiteHeader` | `components/primitives/SiteHeader.tsx` | 로고, 학년 nav, 검색 버튼, 테마 토글 |
| `Overlay/SearchDialog` | `components/primitives/SearchDialog.tsx` | empty/results/active row 상태 포함 |
| `Progress/HomeProgress` | `components/primitives/HomeProgress.tsx` | skeleton, default, favorite/recent 포함 |
| `Unit/ResultCard` | `SearchDialog.tsx` result row, `HomeProgress.tsx` chip | 단원 카드/list item 기준 |
| `Unit/UnitHeader` | `components/primitives/UnitHeader.tsx` | breadcrumb, badge, title, subtitle |
| `Unit/ProgressBadge` | `components/primitives/UnitProgressBadge.tsx` | unseen/visited/completed/favorite |
| `Unit/ProgressControls` | `components/primitives/UnitProgressControls.tsx` | completed on/off, favorite on/off |
| `Roadmap/RoadmapPreview` | `components/primitives/RoadmapPreview.tsx` | 선수·현재·후속 단원 경로 |
| `Content/SectionCard` | `components/primitives/SectionCard.tsx` | 단원 본문 섹션 |
| `Marketing/FeatureCard` | `app/page.tsx` + `.va-feature-card` | 홈 과목 카드 |
| `Marketing/CTA` | `app/page.tsx` + `.va-cta` | 홈 CTA 링크 묶음 |

## 5. UI Surface Inventory

Figma에서 먼저 확정해야 할 공통 surface다. 이 surface가 확정되기 전에는 대규모 단원 리디자인을 진행하지 않는다.

| Surface | 현재 코드 | Figma에서 확정할 것 |
|---------|-----------|--------------------|
| Home hero | `app/page.tsx`, `.va-hero` | hero 높이, stats grid, title/subtitle hierarchy |
| Home subject cards | `app/page.tsx`, `.va-feature-grid`, `.va-feature-card` | 카드 density, hover, 과목 색상 사용 방식 |
| Home progress | `components/primitives/HomeProgress.tsx` | progress bar, favorite/recent chip, skeleton |
| Header/navigation | `components/primitives/SiteHeader.tsx` | sticky header height, nav dropdown, search affordance, mobile behavior |
| Search modal | `components/primitives/SearchDialog.tsx` | overlay opacity, input row, result row, active/empty states |
| Unit card/list item | `SearchDialog.tsx` results, `HomeProgress.tsx` chips | unit ID, title, domain, active/hover, truncation |
| Unit header | `components/primitives/UnitHeader.tsx` | breadcrumb, unit ID badge, priority badge, title scale |
| Unit progress | `components/primitives/UnitProgressBadge.tsx`, `UnitProgressControls.tsx` | completed/visited/unseen/favorite states, touch target |
| Unit content sections | `components/primitives/SectionCard.tsx` | section rhythm, text width, heading hierarchy |
| Unit CTA | `UnitProgressControls.tsx`, unit page links | primary/secondary actions and 44px touch target |
| Slider-graph representative unit | `app/(units)/grade-9/math/M9-CR-03/page.tsx` | graph/card/content balance at desktop and 360px |
| Pattern engine shell | `components/interactive/pattern-engines/PatternEngineScaffold.tsx` | control density, result panel, reset affordance, mobile stacking |

## 5.1 Product UX Surfaces

Figma surface는 다음 제품 루프를 반영해야 한다.

| UX surface | 목적 | Figma에서 확정할 것 |
|------------|------|--------------------|
| Personalized Home | 오늘 뭘 할지 고민하지 않게 함 | 추천 단원, 최근 학습, 즐겨찾기, 과목별 진도 |
| Search Entry | 392개 단원의 핵심 진입로 | 단원명, 개념, ID, 과목/학년/상태 필터 |
| Interactive Unit | See -> Touch -> Predict -> Explain -> Challenge | 캔버스, 조작 패널, 결과 패널, 미니 도전, 완료 CTA |
| Roadmap Preview | 목록 대신 학습 지도 제공 | 선수·후속 단원 노드, 현재 위치, 다음 추천 |
| Progress Dashboard | 반복 방문 동기 제공 | 완료율, 연속 학습일, 탐구 점수, 개념 배지 |

현재 `RoadmapPreview`는 Figma 부재 상태에서도 구현 가능한 최소 surface로, 앱에 이미 검증된 `prerequisites`와 UnitContent `nextUnitIds`만 사용한다. Figma가 도착하면 시각 밀도와 노드 배치만 조정하고, 검증되지 않은 추천 단원이나 임의 경로 데이터는 추가하지 않는다.

## 6. Token Bridge

### 1차 범위

이번 handoff foundation의 1차 범위는 light background, light foreground, 과목 색상, card background, border, soft shadow, CTA, hover, success state, typography, spacing이다. Dark token은 보조 옵션으로만 유지한다. 인터랙티브 내부의 그래프 팔레트, chart 색상, 개별 hover 효과는 다음 스프린트에서 surface별로 분리한다.

### Code -> Figma 대응표

| Code token/class | Current value | Figma variable proposal | Mode |
|------------------|---------------|-------------------------|------|
| `--color-math` | `oklch(0.55 0.18 254)` | `subject/math` | global |
| `--color-science` | `oklch(0.55 0.18 152)` | `subject/science` | global |
| `--color-korean` | `oklch(0.6 0.22 25)` | `subject/korean` | global |
| `--color-english` | `oklch(0.55 0.2 290)` | `subject/english` | global |
| `--color-social` | `oklch(0.65 0.18 50)` | `subject/social` | global |
| `--color-accent` | `oklch(0.85 0.18 95)` | `accent/default` | global |
| `--background` | `#ffffff` / `#0a0a0a` | `surface/background/default` | light/dark |
| `--foreground` | `#171717` / `#ededed` | `surface/foreground/default` | light/dark |
| `--va-hero-bg` | `#ffffff` / `#000000` | `surface/hero/background` | light/dark |
| `--va-hero-fg` | `#0a0a0a` / `#ffffff` | `surface/hero/foreground` | light/dark |
| `--va-subtle` | `#6b7280` / `#6b7280` | `text/subtle` | light/dark |
| `--va-border` | `rgba(0,0,0,.08)` / `rgba(255,255,255,.08)` | `border/default` | light/dark |
| `--va-card-hover` | `rgba(0,0,0,.04)` / `rgba(255,255,255,.04)` | `state/card/hover` | light/dark |
| `--va-desc` | `#525252` / `#a0a0a0` | `text/description` | light/dark |
| `--font-sans` | `var(--font-pretendard)` | `font/sans` | global |
| `--font-mono` | `var(--font-mono)` | `font/mono` | global |
| `.va-hero` padding | `80px 48px`, mobile `48px 24px` | `space/hero/x`, `space/hero/y` | responsive |
| `.va-feature-card` padding | `32px 24px`, mobile `24px 20px` | `space/card/x`, `space/card/y` | responsive |
| `.va-cta__link` padding | `20px 24px`, mobile `16px 20px` | `space/action/x`, `space/action/y` | responsive |

### Light Education Tokens

| Figma variable proposal | Purpose |
|-------------------------|---------|
| `surface/app/background` | 흰색/오프화이트 앱 배경 |
| `surface/card/background` | 흰색 단원/진도 카드 |
| `surface/lab/background` | 밝은 실험실형 인터랙티브 캔버스 |
| `shadow/card/soft` | 카드가 살짝 떠 보이는 부드러운 그림자 |
| `action/primary/background` | 시작하기/이어하기/완료하기 CTA |
| `action/secondary/background` | 전체 탐색/저장/다시보기 |
| `state/success/background` | 완료 저장, 정답, 이해 완료 피드백 |
| `state/streak/background` | 연속 학습일, 오늘의 미션 |

### Token Naming Rules

- Figma variable names use slash paths: `surface/background/default`, `subject/math`, `space/card/x`.
- CSS custom properties keep kebab-case: `--va-card-hover`, `--color-math`.
- If a Figma value maps to Tailwind utility only, record the utility in the handoff notes before adding a new CSS token.
- Light values are the default Figma variables and code `:root` values. Dark values live in the optional `dark` Figma mode and code `.dark`.
- New tokens must be added to this table in the same change that edits `app/globals.css`.

## 7. Implementation Checklist

Before code changes:

- [ ] Figma frame names match this document.
- [ ] Target frames/components are marked Ready for dev.
- [ ] Dev Mode annotations cover development, interaction, accessibility, and content notes.
- [ ] If a frame was already implemented, Dev Mode compare changes was checked.
- [ ] Required captures are attached or linked.
- [ ] Token export includes Light-first values; dark values are optional unless the change affects theme tokens.
- [ ] Variable mode/alias chain is understood before copying values.
- [ ] The change preserves the product loop: See -> Touch -> Predict -> Explain -> Challenge.
- [ ] Behavior changes are explicitly listed; otherwise preserve existing behavior.
- [ ] No mock/fake data is introduced as production content.

During implementation:

- [ ] Update `app/globals.css` tokens before component styling.
- [ ] Keep common changes in `components/primitives/*`.
- [ ] Keep unit-specific changes scoped to the target unit page/component.
- [ ] Prefer Code Connect mapped primitives over raw generated snippets when available.
- [ ] Preserve keyboard behavior in `SearchDialog` (`Esc`, arrows, `Enter`).
- [ ] Preserve progress storage behavior in `lib/progress.ts`.
- [ ] Maintain 44px minimum touch target for CTA/progress controls.

Verification:

- [ ] `npm run lint:md`
- [ ] `npm run validate`
- [ ] `npm run tsc`
- [ ] `npm test`
- [ ] `npm run test:e2e`
- [ ] Manual: home desktop/mobile
- [ ] Manual: search modal desktop/mobile
- [ ] Manual: `M9-CR-03` desktop/mobile
- [ ] Manual: default light mode
- [ ] Manual: dark mode only when theme tokens or dark classes changed

## 8. Completion Criteria

이 foundation 작업은 다음을 만족하면 완료다.

- Figma/Stitch 작업 순서와 입력물 기준이 문서화되어 있다.
- 공통 UI surface inventory가 코드 파일명과 연결되어 있다.
- `app/globals.css`의 현재 token이 Figma 변수 후보와 대응된다.
- Ready for dev, annotation, variable mode, Code Connect 사용 기준이 문서화되어 있다.
- README와 progress 문서가 "Figma 중심, Stitch 보조" 원칙을 가리킨다.
- 모든 자동 검증이 통과한다.

## 9. External References

- [Figma Dev Mode](https://www.figma.com/dev-mode/)
- [Figma Dev Mode Guide](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode)
- [Figma Ready for Dev View](https://help.figma.com/hc/en-us/articles/23918228264855-Dev-Mode-ready-for-dev-view)
- [Figma Code Connect UI](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/)
- [Figma MCP Server Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server)
- [Figma Development Readiness](figma-development-readiness.md)
- [Google Stitch](https://stitch.withgoogle.com/)
- [Product UX Foundation](product-ux-foundation.md)
- [Brand Assets](brand-assets.md)
