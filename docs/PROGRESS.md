# 콘텐츠 진척 현황

**Last Updated:** 2026-05-21  
**Repository Completion:** 392/392 active units · 0 planned · 0 generated stubs  
**Audit Command:** `npm run audit:completion`

---

## 1. 완료 기준

이 문서의 완료율은 저장소에서 자동 검증 가능한 기준만 사용한다.

- 마스터 인덱스에 열거된 392개 ID가 모두 앱 메타데이터에 등록됨
- 등록된 392개 단원 라우트가 모두 존재함
- 모든 등록 단원이 `draft` 이상 상태이며 `planned`가 남아 있지 않음
- 자동 생성 placeholder/stub 문구가 남아 있지 않음
- 활성 단원 페이지가 `InteractiveErrorBoundary`를 사용함
- 활성 단원의 `componentName`이 실제 인터랙티브 export와 연결됨

---

## 2. 전체 요약

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| generated stub page | 0 |
| 인터랙티브 export | 270 |
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
| 의존성 보안 감사 | CI 포함 | `npm run audit:security` |
| TypeScript | CI 포함 | `npm run tsc` |
| Unit tests | CI 포함 | `npm test` |
| Build | CI 포함 | `npm run build` |
| E2E | CI 포함 | `npm run test:e2e` |
| Secret grep | CI 포함 | `npm run secret-grep` |

---

## 6. 최근 정리 내역

- `S-LE1-01`, `S-LE1-02`, `S-LE2-01`을 실제 페이지/컴포넌트 상태에 맞춰 `draft`로 승격했다.
- `scripts/completion-audit.ts`를 추가해 마스터 인덱스 ID, 앱 등록, 라우트, stub, error boundary, component export, 공개 문서 존재 여부를 한 번에 감사한다.
- CI에 `audit:completion`과 `audit:security`를 추가했다.
- Dependabot 설정을 추가했다.
- Next.js를 16.2.6으로 올리고 Next 내부 PostCSS override를 적용해 `npm audit --audit-level=moderate` 기준 취약점 0개 상태로 정리했다.
- README, CLAUDE.md, docs README, architecture/playbook 문서를 현재 구조와 수치에 맞게 최신화했다.

---

## 7. 디자인 핸드오프 상태

- 최종 디자인 기준은 Figma다.
- Google Stitch는 초안 생성과 변형 탐색에만 사용한다.
- 현재 환경에는 Figma 직접 커넥터가 없으므로 Figma 링크, 캡처, token export 기반으로 구현한다.
- 상세 절차는 `docs/design/figma-stitch-handoff.md`를 기준으로 한다.
