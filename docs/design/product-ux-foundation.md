# Product UX Foundation

**Last Updated:** 2026-05-21

## 1. UX North Star

이 앱은 전 과목 위키가 아니다. 초3~고3 학생이 국어·영어·수학·사회·과학 개념을 검색하고, 만지고, 실험하고, 저장하고, 다음 개념으로 이동하는 **인터랙티브 학습 맵**이다.

> 교과서 개념을 손으로 만지는 초3~고3 인터랙티브 학습 지도.

핵심 경험은 읽기보다 조작이다. 학생이 개념을 읽는 순간보다 직접 바꾸고 결과를 보는 순간을 UX의 중심에 둔다.

## 2. Reference Patterns

| Reference | 이 앱에 가져올 패턴 | 적용 |
|-----------|--------------------|------|
| 말해보카 | 한국형 개인화 드릴, 자동 복습, 학습 통계, 즐겨찾기 | 이어하기, 오늘의 복습, 약한 단원, 과목별 진도, 보관함 |
| 스픽 | Learn-Practice-Apply 행동 루프와 말하기 불안 완화 | 개념 보기, 조작하기, 실제 문제/상황에 적용, 즉시 피드백 |
| 듀오링고 | 경로형 진행, 짧은 세션, XP, 스트릭, 배지 | 과목/학년별 국지 패스, 탐구 점수, 연속 학습일, 개념 배지 |
| 26초 | 앱이 오늘 분량을 정하고 사용자는 카드만 빠르게 처리 | 오늘의 개념 큐, 이해도 체크, 복습 큐, 학습량 선택 |
| NCIC | 교육과정 원문 기준 | 단원 ID, 성취기준, 과목/학교급 구조의 기준 |

경쟁이나 랭킹은 기본 경험으로 강하게 넣지 않는다. 비영리·개인 학습용 앱이므로 완료감, 연속성, 저장, 복습, 개념 배지 중심이 우선이다.

## 3. Core Learning Loop

단원 페이지의 표준 흐름은 **Learn -> Manipulate -> Check -> Review**다. 스픽의 Learn-Practice-Apply를 5과목 개념 조작형 학습에 맞춘 구조다.

| Macro Step | Purpose | UI |
|------------|---------|----|
| Learn | 개념의 핵심 질문과 최소 설명 제공 | 개념 프리뷰, 공식/관계, 선수 개념 |
| Manipulate | 변수를 직접 바꾸고 현상을 관찰 | 인터랙티브 캔버스, 슬라이더, 드래그, 토글 |
| Check | 이해 여부를 짧게 확인 | 1~3문항 미니 체크, 즉시 피드백 |
| Review | 복습 큐와 다음 경로로 연결 | 복습 저장, 완료 CTA, 선수/후속 단원 |

인터랙티브 내부 루프는 다음 5단계로 설계한다.

| Step | Korean UI | Purpose |
|------|-----------|---------|
| See | 먼저 보기 | 핵심 질문과 개념을 빠르게 파악 |
| Touch | 손으로 바꾸기 | 슬라이더, 드래그, 토글로 변수를 조작 |
| Predict | 결과 예측하기 | 조작 결과를 보기 전에 생각하게 함 |
| Explain | 이유 확인하기 | 변화의 원리, 공식, 관계를 설명 |
| Challenge | 한 문제 도전하기 | 미니 문제로 이해를 저장 가능한 상태로 전환 |

모든 주요 단원은 두 루프를 함께 만족해야 한다. 단원 구조는 Learn -> Manipulate -> Check -> Review로 통일하고, Manipulate 안에서는 See -> Touch -> Predict -> Explain -> Challenge를 반복한다. 설명문은 인터랙티브 캔버스를 보조하고, 단원 페이지의 주인공은 조작 가능한 캔버스다.

## 4. Light-First Design Direction

기본 테마는 Light-first다. 다크 모드는 선택 옵션으로 유지하되, 최종 Figma 기준과 기본 사용자 경험은 밝은 교육용 UI로 둔다.

디자인 목표:

- 초3~고3 모두에게 친근한 밝은 학습 환경
- 흰색/오프화이트와 연한 회색 기반의 깨끗한 배경
- 카드, 배지, 진행률, CTA에 과목별 색상 적극 사용
- 인터랙티브 캔버스는 밝은 실험실처럼 보이게 구성
- 텍스트 가독성과 터치 조작성을 최우선으로 둠
- 게임형 요소는 가볍고 산뜻하게 표현

## 5. Product IA

```text
Edu Platform
├─ Home: 이어하기, 오늘의 복습, 과목 허브, 최근 학습, 즐겨찾기, 과목별 진도
├─ Explore: 학교급, 학년, 과목, 영역, 단원 목록
├─ Unit: 단원 헤더, 요약, 인터랙티브 캔버스, 조작 패널, 미니 도전, 선수/후속 단원
├─ Search: Ctrl+K 검색, 과목/학년/상태 필터
├─ Roadmap: 선수·후속 개념 그래프와 추천 경로
├─ Progress: 전체/과목/학년 진도, 연속 학습일, 복습 예정
├─ Collection: 저장한 단원, 즐겨찾기, 어려웠던 단원
└─ Settings: 학년, 관심 과목, 테마, 글자 크기, 모션 감소, 조작 위치
```

전역 IA는 검색 우선 + 과목/학년별 국지 패스 보조 구조로 둔다. 듀오링고식 전역 단일 패스는 392개 현재 앱 단원 규모에서도 너무 길고, 장기 488개 확장 시 더 무거워진다. 대신 학년/과목/영역별 짧은 경로를 여러 개 제공한다.

## 5.1 Home Priority

홈은 마케팅 허브가 아니라 즉시 학습 진입 허브다.

1. 오늘의 개념 큐
2. 이어하기
3. 오늘의 복습
4. 검색
5. 과목 허브
6. 추천 경로
7. 최근 학습
8. 즐겨찾기
9. 출처/라이선스

첫 카드는 항상 사용자가 다시 들어왔을 때 할 다음 행동을 보여준다. 탐색은 중요하지만 재진입보다 앞서면 안 된다.

## 5.2 Unit Page Standard

```text
UnitPage
├─ Header: 학년/과목/영역, 단원명, 예상 소요 시간, 완료/즐겨찾기
├─ Learn: 핵심 개념 프리뷰, 공식/관계, 선수 개념
├─ Manipulate: 밝은 실험실형 캔버스, 조작 패널, 실시간 결과
├─ Check: 1~3문항 확인 문제, 즉시 피드백
├─ Review: 복습 큐 저장, 완료 CTA, 다음 단원
└─ Sources: 교육과정/외부 자료/라이선스
```

완료와 복습은 분리한다. 완료는 한 번의 상태이고, 복습은 반복 큐다. 둘을 섞으면 진도 신뢰성이 깨진다.

## 6. P0 UX Roadmap

1. Home 개인화 대시보드
2. TodayConceptQueue + ReviewQueue + StreakChip
3. Header + Ctrl+K 검색 모달
4. UnitCard 상태 체계
5. UnitPage 표준 레이아웃
6. InteractiveModule 공통 UX 템플릿
7. Progress Dashboard
8. Roadmap Preview
9. `M9-CR-03` 파일럿 단원 완성도 강화

## 7. Pilot Unit Standard

`M9-CR-03`은 전체 앱의 UX 문법을 확정하는 파일럿이다.

확정할 것:

- 단원 헤더
- 과목/학년/영역 배지
- 인터랙티브 캔버스 비율
- 슬라이더 UI
- 실시간 결과 패널
- 설명 패널
- 미니 도전
- 완료 CTA
- 선수/후속 단원 추천
- 모바일 하단 조작 패널

## 8. Source Links

- [말해보카 2025 홈 화면 개편 보도자료](https://epop.ai/newsroom/32)
- [Speak Method: Learn, Practice, Apply](https://www.speak.com/blog/how-speak-reinvents-language-learning)
- [Duolingo Friend Streak](https://blog.duolingo.com/friend-streak/)
- [Duolingo Method Whitepaper](https://duolingo-papers.s3.amazonaws.com/reports/duolingo-method-whitepaper.pdf)
- [26초 App Store](https://apps.apple.com/kr/app/26%EC%B4%88-%EC%B4%88%EA%B3%A0%EC%86%8D-%EB%8B%A8%EC%96%B4-%EC%95%94%EA%B8%B0/id6738269475)
- [26초 Google Play](https://play.google.com/store/apps/details?hl=ko&id=com.skimmify.toeic)
- [26초 공식 홈페이지](https://skimmify.com/)
- [NCIC 국가교육과정정보센터](https://ncic.re.kr/)

## 9. Data Caution

경쟁앱 버전, 다운로드 수, 평점, 리뷰 수는 앱스토어와 Play 스토어에서 자주 바뀐다. 제품 설계 문서에는 변동 수치를 고정하지 말고, 필요할 때 공식 스토어/공식 블로그에서 다시 확인한다.

현재 저장소 감사 기준은 392개 단원이다. 장기 제품 브리프에서 488개/800개 내외 리소스를 목표로 언급하더라도, README나 진행률에는 `npm run audit:completion`으로 확인되는 수치만 쓴다.
