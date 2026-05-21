# 교육 플랫폼 문서 패키지

이 폴더는 한국 초3~고3 인터랙티브 교육 플랫폼의 제작 기준, 검증 기준, 디자인 핸드오프 기준을 모은 문서 패키지다.

## 현재 저장소 범위

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| generated stub page | 0 |
| 인터랙티브 export | 270 |

위 수치는 `npm run audit:completion`으로 검증한다.

## 문서 구성

| 파일 | 내용 |
|------|------|
| `00-MASTER-INDEX.md` | 현재 앱 범위의 392개 단원 ID와 인터랙티브 후보 |
| `01-architecture.md` | 현재 Next.js 16 앱 구조와 데이터 흐름 |
| `02-component-catalog.md` | 20가지 인터랙티브 패턴 카탈로그 |
| `03-claude-code-playbook.md` | 새 단원이나 컴포넌트 작업 시 쓰는 제작 SOP |
| `04-sample-interactives/quadratic-function.html` | 이차함수 인터랙티브 원형 샘플 |
| `COMPLETION-AUDIT.md` | 저장소 완료 감사 기준과 명령 |
| `MOBILE-CHECKLIST.md` | 모바일 수동 검증 체크리스트 |
| `PROGRESS.md` | 현재 커버리지와 품질 게이트 |
| `design/product-ux-foundation.md` | Light-first 인터랙티브 학습 맵 디자인/UX 제품 기준 |
| `design/competitive-ux-reverse-engineering.md` | 말해보카·스픽·듀오링고 디자인/UX 역기획 레퍼런스 |
| `design/figma-stitch-handoff.md` | Figma 중심, Stitch 보조 프론트엔드 핸드오프 기준 |

## 운영 원칙

1. **Figma가 최종 디자인 기준**이다. Stitch는 초안 생성과 변형 탐색에만 사용한다.
2. **제품 UX와 디자인 판단은 인터랙티브 학습 맵 기준**이다. 자세한 기준은 `design/product-ux-foundation.md`와 `design/competitive-ux-reverse-engineering.md`를 따른다.
3. **기본 디자인은 Light-first**다. 다크 모드는 선택 옵션으로만 유지한다.
4. **코드 반영은 출처가 있는 입력물 기준**으로 한다. Figma 링크, 캡처, token export, NCIC/공식 출처를 우선한다.
5. **문서 수치와 앱 수치는 자동 감사로 맞춘다.** 새 단원을 추가하거나 상태를 바꾸면 `npm run audit:completion`을 통과해야 한다.
6. **보안과 공개 저장소 기본 문서는 유지한다.** LICENSE, LICENSE-CONTENT, SECURITY, CONTRIBUTING, README가 누락되면 감사가 실패한다.

## 검증 명령

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:security
npm run tsc
npm test
npm run test:e2e
```

## 1차 출처

- [NCIC 국가교육과정정보센터](https://ncic.re.kr)
- [고교학점제 지원센터](https://hscredit.kr)
- [한국교육과정평가원](https://www.kice.re.kr)
- [에듀넷·티-클리어](https://www.edunet.net)

## 라이선스

- 코드: MIT (`../LICENSE`)
- 콘텐츠: CC BY-NC 4.0 (`../LICENSE-CONTENT.md`)
