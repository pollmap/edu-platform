# 모바일 360px 검증 체크리스트

> 단원 양산 시 매번 확인. Sprint 11+에서 Playwright 자동화로 보완 예정.

## DevTools 검사

1. Chrome DevTools → Device Mode → 360 × 640 (iPhone SE 또는 Pixel 5)
2. 페이지 로드 후 다음 체크:

### 레이아웃
- [ ] 가로 스크롤 X (overflow-x: hidden 또는 그리드/플렉스 자동 줄바꿈)
- [ ] 인터랙티브 캔버스가 컨테이너에 맞게 축소 (aspect-ratio 1:1 또는 4:3)
- [ ] 텍스트 줄바꿈 자연스러움 (한자어/영어 단어 깨짐 X)

### 터치
- [ ] 슬라이더 thumb 44 × 44px+
- [ ] 버튼 min-h-[44px]
- [ ] 링크 패딩 충분 (피해 영역 8px+)

### 가독성
- [ ] 본문 14~16px (한글 11px 이하 X)
- [ ] 라벨 12px+
- [ ] 명도 대비 WCAG AA (4.5:1 본문, 3:1 큰 글자)

### 인터랙티브
- [ ] 입력 → 결과 100ms 이내 반응
- [ ] 기본 라이트 모드에서 캔버스, 카드, CTA 가시성 확보
- [ ] 다크 모드는 보조 옵션으로만 확인
- [ ] 키보드 (Tab/화살표) 작동

## 실폰 검사 (스프린트 종료 시)

- [ ] iPhone Safari 한 번
- [ ] Android Chrome 한 번
- [ ] 가로 회전 시 깨짐 X

## 스크립트로 자동화 (Sprint 11+)

```bash
npm run test:e2e -- --project=mobile-360
```
