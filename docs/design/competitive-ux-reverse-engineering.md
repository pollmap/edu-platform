# Competitive UX Reverse Engineering

**Last Updated:** 2026-05-21

이 문서는 말해보카, 스픽, 듀오링고의 공개 UX 패턴을 K-12 인터랙티브 교육 플랫폼에 적용하기 위한 **디자인/UX 역기획 레퍼런스**다. 화면 우선순위, IA, 학습 루프, 카드/CTA/진도/검색 패턴을 Figma와 코드 디자인 판단의 기준으로 삼는다. 변동이 큰 앱 버전, 다운로드 수, 평점, 리뷰 수는 이 문서에 고정하지 않는다. 필요 시 공식 앱스토어, Play 스토어, 공식 블로그에서 다시 확인한다.

## 1. One-Line Summary

| App | Structural Pattern | 가져올 것 |
|-----|--------------------|-----------|
| 말해보카 | 한국형 개인화 드릴 + 자동 복습 + 가벼운 게임화 | 이어하기, 오늘의 복습, 약한 단원, 학습 통계, 즐겨찾기 |
| 스픽 | AI 튜터 + 출력 중심 Learn-Practice-Apply | Learn -> Manipulate -> Check -> Review 단원 흐름 |
| 듀오링고 | 경로형 진행 + 습관화 + 대규모 리텐션 시스템 | 과목/학년별 패스, 스트릭, 배지, 탐구 점수 |

## 2. What To Adopt

### Home

홈은 마케팅 배너가 아니라 즉시 학습 진입 허브다.

- 첫 카드: 이어하기
- 두 번째 카드: 오늘의 복습
- 세 번째 영역: 과목 허브
- 보조 영역: 최근 학습, 즐겨찾기, 추천 경로
- 전역 검색: Ctrl+K와 모바일 검색 버튼을 핵심 내비게이션으로 승격

### Search

392개 현재 앱 단원과 장기 확장 범위를 고려하면 검색은 부가 기능이 아니라 기본 경로다.

- 검색창
- 학년 칩
- 과목 칩
- 단원 코드 직접 입력
- 최근 검색
- 상태 필터

고급 필터는 최소화한다. 필터가 많아지면 초등 사용자의 탐색 비용이 커진다.

### Unit

단원 페이지는 다음 구조로 통일한다.

```text
Learn -> Manipulate -> Check -> Review
```

- Learn: 핵심 개념 프리뷰
- Manipulate: 인터랙티브 캔버스와 조작 패널
- Check: 1~3문항 확인 문제
- Review: 복습 큐 저장, 완료 CTA, 다음 단원 추천

### Progress

진도는 성취를 가시화하되 과잉 게임화하지 않는다.

- 과목별 완료율
- 학년별 패스
- 약한 단원
- 복습 예정
- 연속 학습일
- 개념 배지

리더보드는 기본 제품에 넣지 않는다. 나중에 학급/동아리 모드로 분리한다.

## 3. What To Avoid

| Anti-pattern | 이유 |
|--------------|------|
| 전역 단일 패스 | 392개 현재 단원만으로도 너무 길고, 장기 488개 확장 시 더 무거워진다. |
| 마케팅형 홈 | 재방문 사용자는 설명보다 바로 이어 할 행동이 필요하다. |
| 에너지/하트 페널티 | 공익형 K-12 학습에서는 학습 중단을 벌주는 구조가 맞지 않는다. |
| 리뷰/복습 블랙박스 | 왜 다시 보는지 설명되지 않으면 신뢰가 떨어진다. |
| 완료와 복습의 혼합 | 완료는 한 번의 상태이고, 복습은 반복 큐다. |
| 긴 설명문 중심 단원 | 이 앱의 차별점은 읽기가 아니라 조작이다. |

## 4. K-12 Product Translation

| 설계 표면 | 적용 |
|-----------|------|
| Home | 이어하기, 오늘의 복습, 과목 허브를 첫 화면 상단에 고정 |
| Search modal | 단원명, 개념, ID, 학년, 과목으로 즉시 이동 |
| Unit card | 학년·과목·영역, 진행률, 예상 시간, CTA 1개 |
| Unit header | 커리큘럼 코드, 단원명, 예상 소요 시간, 완료/즐겨찾기 |
| Interactive body | 캔버스 -> 조작 -> 실시간 피드백 -> 확인 문제 |
| Progress dashboard | 학년/과목/표준 단원 기준 진도와 복습 예정 |
| Roadmap | 전역 장거리 패스가 아니라 과목/학년별 짧은 국지 패스 |

## 5. Design Implications

- 기본 테마는 Light-first다.
- 밝은 배경, 선명한 카드, 부드러운 과목 색상, 명확한 CTA를 사용한다.
- 인터랙티브 캔버스는 밝은 실험실처럼 보여야 한다.
- 모바일 터치 타깃은 48px 이상을 기본으로 하고, 초등 중심 화면은 52~56px까지 허용한다.
- CTA는 한 화면에 주 CTA 1개, 보조 CTA 최대 2개로 제한한다.
- 과목별 색은 장식이 아니라 현재 위치와 다음 행동을 알려주는 신호다.

## 6. Immediate Priorities

| Priority | Work | Reason |
|----------|------|--------|
| P0 | 홈의 첫 카드에 이어하기 고정 | 사용자는 탐색보다 재진입을 더 자주 한다. |
| P0 | 검색 모달을 전역 핵심 내비게이션으로 승격 | 단원 규모가 커질수록 검색이 기본 경로가 된다. |
| P0 | 단원 페이지를 Learn -> Manipulate -> Check -> Review로 통일 | 학습 문법이 통일되어야 392개 단원을 유지할 수 있다. |
| P1 | 과목/학년별 국지 패스 도입 | 듀오링고식 경로의 장점만 가져온다. |
| P1 | 복습 큐를 완료 체크와 분리 | 진도 신뢰성을 지킨다. |

## 7. Source Links

- [말해보카 2025 홈 화면 개편 보도자료](https://epop.ai/newsroom/32)
- [Speak: How Speak reinvents language learning](https://www.speak.com/blog/how-speak-reinvents-language-learning)
- [Duolingo: Friend Streak](https://blog.duolingo.com/friend-streak/)
- [Duolingo Method Whitepaper](https://duolingo-papers.s3.amazonaws.com/reports/duolingo-method-whitepaper.pdf)
- [NCIC 국가교육과정정보센터](https://ncic.re.kr/)
