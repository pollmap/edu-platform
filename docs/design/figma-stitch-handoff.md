# Figma/Stitch 프론트엔드 핸드오프

**Last Updated:** 2026-05-21

이 문서는 첫 리디자인 스프린트의 기준 문서다. Google Stitch는 빠른 화면 시안과 변형 탐색용으로 쓰고, Figma를 최종 디자인 기준으로 둔다. 코드 반영은 Figma 링크, 화면 캡처, 토큰 export를 받은 뒤 진행한다. 현재 작업 환경에는 Figma 직접 커넥터/MCP를 사용하지 않는다.

## 1. 작업 순서

1. **Stitch에서 초안 생성**
   - 홈, 단원 상세, 검색 모달, 다크 모드의 시각 방향을 빠르게 만든다.
   - Stitch 산출물은 최종 기준이 아니다. 화면 구조, 밀도, 색감 후보를 고르는 재료로만 사용한다.
2. **Figma에서 최종 정리**
   - Stitch 결과를 Figma로 옮긴 뒤 auto layout, component, variable, mode를 정리한다.
   - Figma frame과 component 이름은 아래 naming 규칙을 따른다.
   - Dev Mode에서 spacing, typography, color token 값을 확인할 수 있어야 한다.
3. **코드 반영**
   - Figma 링크, 캡처, token export, 변경 범위를 이 문서 체크리스트에 맞춰 확인한다.
   - `app/globals.css`의 `@theme`, `:root`, `.dark`, `va-*` 토큰을 먼저 갱신한다.
   - 이후 `components/primitives/*`와 해당 화면의 page 컴포넌트를 최소 범위로 수정한다.
4. **검증**
   - 문서/정적 검증: `npm run lint:md`, `npm run validate`, `npm run tsc`
   - 기능 회귀: `npm test`, `npm run test:e2e`
   - 수동 확인: 홈, 검색 모달, 파일럿 단원 `M9-CR-03`, 360px 모바일, 다크 모드

## 2. 필수 입력물

| 입력물 | 필수 여부 | 기준 |
|--------|-----------|------|
| Figma 링크 | 필수 | Dev Mode에서 inspect 가능한 file/frame 링크 |
| 화면 캡처 | 필수 | desktop/mobile, light/dark 구분 |
| 토큰 export | 필수 | color, typography, spacing, radius의 Figma variable 또는 JSON/CSV |
| Stitch 링크/캡처 | 선택 | 시안 출처 확인용. 최종 기준으로 사용하지 않음 |
| 변경 설명 | 필수 | 변경할 surface, 유지할 behavior, 접근성 예외 여부 |

## 3. 1차 필수 캡처

1. `Home / Desktop / Light`
2. `Home / Mobile-360 / Light`
3. `Unit / M9-CR-03 / Desktop / Light`
4. `Unit / M9-CR-03 / Mobile-360 / Light`
5. `SearchDialog / Desktop / Light`
6. `SearchDialog / Mobile-360 / Light`
7. `Home / Desktop / Dark`
8. `Unit / M9-CR-03 / Desktop / Dark`

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
| Pilot unit | `app/(units)/grade-9/math/M9-CR-03/page.tsx` | graph/card/content balance at desktop and 360px |

## 6. Token Bridge

### 1차 범위

이번 handoff foundation의 1차 범위는 과목 색상, 배경/전경, border, card hover, typography, spacing이다. 인터랙티브 내부의 그래프 팔레트, chart 색상, 개별 hover 효과는 다음 스프린트에서 surface별로 분리한다.

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

### Token Naming Rules

- Figma variable names use slash paths: `surface/background/default`, `subject/math`, `space/card/x`.
- CSS custom properties keep kebab-case: `--va-card-hover`, `--color-math`.
- If a Figma value maps to Tailwind utility only, record the utility in the handoff notes before adding a new CSS token.
- Light/dark values live as Figma variable modes named `light` and `dark`; code values live in `:root` and `.dark`.
- New tokens must be added to this table in the same change that edits `app/globals.css`.

## 7. Implementation Checklist

Before code changes:

- [ ] Figma frame names match this document.
- [ ] Required captures are attached or linked.
- [ ] Token export includes light and dark values.
- [ ] Behavior changes are explicitly listed; otherwise preserve existing behavior.
- [ ] No mock/fake data is introduced as production content.

During implementation:

- [ ] Update `app/globals.css` tokens before component styling.
- [ ] Keep common changes in `components/primitives/*`.
- [ ] Keep unit-specific changes scoped to the target unit page/component.
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
- [ ] Manual: dark mode

## 8. Completion Criteria

이 foundation 작업은 다음을 만족하면 완료다.

- Figma/Stitch 작업 순서와 입력물 기준이 문서화되어 있다.
- 공통 UI surface inventory가 코드 파일명과 연결되어 있다.
- `app/globals.css`의 현재 token이 Figma 변수 후보와 대응된다.
- README와 progress 문서가 "Figma 중심, Stitch 보조" 원칙을 가리킨다.
- 모든 자동 검증이 통과한다.

## 9. External References

- [Figma Dev Mode](https://www.figma.com/dev-mode/)
- [Figma Code Connect UI](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/)
- [Google Stitch](https://stitch.withgoogle.com/)
