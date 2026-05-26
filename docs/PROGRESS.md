# 콘텐츠 진척 현황

**Last Updated:** 2026-05-22  
**Repository Completion:** 392/392 active units · 0 planned · 0 generated stubs  
**Detailed Content:** 392/392 verified UnitContent · 96 unverified expansion candidates blocked  
**Blueprint/Interaction:** 392/392 UnitBlueprints · 20/20 pattern engines · 0 legacy renderers  
**UX Readiness:** Search/progress/roadmap regression coverage · `/progress` dashboard · Figma implementation gated until canonical frames/tokens arrive
**Audit Commands:** `npm run audit:completion` · `npm run audit:content` · `npm run audit:blueprint` · `npm run audit:interaction`

---

## 1. 완료 기준

이 문서의 완료율은 저장소에서 자동 검증 가능한 기준만 사용한다.

- 마스터 인덱스에 열거된 392개 ID가 모두 앱 메타데이터에 등록됨
- 등록된 392개 단원 라우트가 모두 존재함
- 모든 등록 단원이 `draft` 이상 상태이며 `planned`가 남아 있지 않음
- 자동 생성 placeholder/stub 문구가 남아 있지 않음
- 활성 단원 페이지가 `InteractiveErrorBoundary`를 사용함
- 활성 단원의 `engineId`가 실제 pattern engine registry와 연결됨
- 모든 단원이 공통 학습자료 패널에서 핵심질문, 3개 학습목표, 5단계 조작 루프, 미니 도전, 오개념 교정, 적용 장면, 산출물, 3개 복습 질문을 제공함
- 모든 단원이 `lib/unit-content/` 세부 콘텐츠를 가지며 출처 refs, 쉬운/표준/심화 설명, 예시 3개, 정확히 3문항 미니 문제, 정답/해설, 흔한 실수, 실생활 적용, 유효한 다음 단원 ID를 제공함
- 모든 단원이 `UnitBlueprint + UnitLearningMaterial + UnitInteractiveRenderer` 경로로 렌더링됨
- 20개 pattern engine이 registry에 등록되어 있고 정상 경로 legacy renderer가 0개임
- 488개 목표 중 추가 96개는 공식 출처 행이 검증될 때까지 앱 데이터에 추가하지 않음

---

## 2. 전체 요약

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| generated stub page | 0 |
| 패턴엔진 | 20/20 |
| legacy renderer | 0 |
| 공통 학습자료 | 392/392 |
| 세부 UnitContent | 392/392 |
| UnitBlueprint | 392/392 |
| Roadmap Preview | real prerequisites + nextUnitIds |
| Progress Dashboard | localStorage completion/review/favorite/subject breakdown |
| 488 확장 후보 | 96 보류 |
| 차단 이슈 | 0 |

---

## 3. 과목별 진척도

| 과목 | 활성 | 전체 | 완료율 | planned |
|------|------|------|--------|---------|
| 수학 (Math) | 138 | 138 | 100% | 0 |
| 과학 (Science) | 104 | 104 | 100% | 0 |
| 사회 (Social) | 75 | 75 | 100% | 0 |
| 국어 (Korean) | 41 | 41 | 100% | 0 |
| 영어 (English) | 34 | 34 | 100% | 0 |
| **합계** | **392** | **392** | **100%** | **0** |

---

## 4. 학교급별 진척도

| 범위 | 활성 | 전체 | planned |
|------|------|------|---------|
| 초등 | 96 | 96 | 0 |
| 중등 | 71 | 71 | 0 |
| 초·중 공통 | 38 | 38 | 0 |
| 고등 공통 | 62 | 62 | 0 |
| 고등 일반선택 | 58 | 58 | 0 |
| 고등 진로선택 | 47 | 47 | 0 |
| 고등 융합선택 | 20 | 20 | 0 |
| **합계** | **392** | **392** | **0** |

---

## 5. 품질 게이트

| 게이트 | 상태 | 명령 |
|--------|------|------|
| 마크다운 표 검증 | CI 포함 | `npm run lint:md` |
| 커리큘럼/라우트 검증 | CI 포함 | `npm run validate` |
| 완료 감사 | CI 포함 | `npm run audit:completion` |
| 교육자료 감사 | CI 포함 | `npm run audit:content` |
| Blueprint 감사 | CI 포함 | `npm run audit:blueprint` |
| Interaction 감사 | CI 포함 | `npm run audit:interaction` |
| 의존성 보안 감사 | CI 포함 | `npm run audit:security` |
| TypeScript | CI 포함 | `npm run tsc` |
| Unit tests | CI 포함 | `npm test` |
| Build | CI 포함 | `npm run build` |
| E2E | CI 포함 | `npm run test:e2e` |
| Secret grep | CI 포함 | `npm run secret-grep` |

---

## 6. 최근 정리 내역

- `UnitBlueprint` 계약을 source/content/interaction 중심으로 확장하고 392개 활성 단원에 authored content와 engineData를 연결했다.
- `components/interactive/pattern-engines/`에 20개 실제 React renderer와 registry를 추가하고, 각 엔진 대표 단원을 Playwright desktop/mobile-360 E2E에 등록했다.
- `UnitInteractiveRenderer`의 정상 경로 fallback을 제거해 registry 누락이 즉시 실패하도록 했다.
- 모든 단원 페이지를 `UnitHeader + UnitLearningMaterial + UnitInteractiveRenderer` 학습 화면으로 재생성했다.
- `docs/unit-source-ledger.md`를 추가해 392 verified rows와 96 blocked rows를 분리했다.
- `docs/PRODUCT-STRATEGY.md`에 제품 가치, 전체 범위, 운영 전략, 한계를 도식화해 정리했다.
- Figma Dev Mode, variables, Ready for dev, annotations, Code Connect, MCP 공식 문서 기준으로 `docs/design/figma-development-readiness.md`를 추가했다.
- `docs/design/figma-stitch-handoff.md`를 배포 직전 Figma 개발 workflow에 맞춰 Ready for dev, annotation, variable mode, Code Connect 기준까지 확장했다.
- `RoadmapPreview`를 추가해 기존 `prerequisites`와 `nextUnitIds`만으로 선수·현재·후속 단원 경로를 보여주고 누락 ID를 숨기지 않게 했다.
- `/progress` 대시보드를 추가해 기존 `edu-platform-progress` schema를 유지한 채 완료·방문·복습 큐·즐겨찾기·과목별 진도를 한 화면에서 확인하게 했다.
- SearchDialog 키보드 진입, progress localStorage 상태, self-check review queue, roadmap preview를 Playwright UX readiness 회귀 테스트로 고정했다.
- `S-LE1-01`, `S-LE1-02`, `S-LE2-01`을 실제 페이지/컴포넌트 상태에 맞춰 `draft`로 승격했다.
- `scripts/completion-audit.ts`를 추가해 마스터 인덱스 ID, 앱 등록, 라우트, stub, error boundary, component export, 공개 문서 존재 여부를 한 번에 감사한다.
- CI에 `audit:completion`과 `audit:security`를 추가했다.
- Dependabot 설정을 추가했다.
- Next.js를 16.2.6으로 올리고 Next 내부 PostCSS override를 적용해 `npm audit --audit-level=moderate` 기준 취약점 0개 상태로 정리했다.
- README, CLAUDE.md, docs README, architecture/playbook 문서를 현재 구조와 수치에 맞게 최신화했다.
- 모든 단원 페이지가 공유하는 `UnitLearningMaterial` 패널을 추가해 핵심질문·목표·조작루프·미니도전·오개념·적용·산출물·복습질문을 392개 단원 전체에 제공한다.
- `scripts/content-audit.ts`를 추가하고 CI에 연결해 교육자료 필수 섹션 누락을 차단한다.
- `lib/unit-content/` 데이터층을 추가해 392개 단원에 출처 refs, 쉬운/표준/심화 설명, 예시, 3문항 미니 문제, 정답/해설, 흔한 실수, 실생활 적용, 다음 단원 연결을 제공한다.
- `scripts/content-audit.ts`를 강화해 UnitContent 누락, 출처 누락, 예시 부족, 미니 문제 수 불일치, 깨진 `nextUnitIds`, 검증 목표 수 불일치를 차단한다.
- 488개 확장 중 미검증 96개는 `docs/UNIT-CONTENT-EXPANSION-CANDIDATES.md`에 보류 상태로 분리했다.

---

## 7. 디자인 핸드오프 상태

- 최종 디자인 기준은 Figma다.
- Google Stitch는 초안 생성과 변형 탐색에만 사용한다.
- 현재 환경에는 Figma 직접 커넥터가 없으므로 Figma 링크, 캡처, token export 기반으로 구현한다.
- Home, SearchDialog, Progress, RoadmapPreview, `M9-CR-03` Unit의 Figma frame/capture/token export가 오기 전에는 대규모 리디자인을 진행하지 않는다.
- 상세 절차는 `docs/design/figma-stitch-handoff.md`를 기준으로 한다.
