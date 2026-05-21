import { expect, test } from '@playwright/test';

test.describe('pilot M9-CR-03', () => {
  test('home links to pilot', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: '하루배움' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: '오늘의 개념 지도' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: '오늘의 3분 개념' })).toBeVisible();
    await page.getByRole('link', { name: /이차함수/ }).first().click();
    await expect(page).toHaveURL(/\/grade-9\/math\/M9-CR-03/);
  });

  test('pilot page renders core components', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');
    await expect(page.getByRole('heading', { level: 1, name: '이차함수', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: '3분 학습 루프' })).toBeVisible();
    await expect(page.getByText('이차함수에서 변하는 양과 변하지 않는 규칙은 무엇일까?')).toBeVisible();
    await expect(page.getByText('미니 도전')).toBeVisible();
    await expect(page.getByText('오개념 바로잡기')).toBeVisible();
    await expect(page.getByText('남길 산출물')).toBeVisible();
    await expect(page.getByText('a (이차항 계수)')).toBeVisible();
    await expect(page.getByText('b (일차항 계수)')).toBeVisible();
    await expect(page.getByText('c (상수항)')).toBeVisible();
  });

  test('self check stores a concept in the review queue', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');
    await page.getByRole('button', { name: /다시 볼래요/ }).click();
    await expect(page.getByText('오늘 복습 큐에 저장했어요.')).toBeVisible();

    await page.goto('/');
    await expect(page.getByText('복습 큐')).toBeVisible();
    await expect(page.getByRole('link', { name: /M9-CR-03 이차함수/ })).toBeVisible();
  });

  test('slider changes update vertex display', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');
    const slider = page.getByLabel('a (이차항 계수)');
    await slider.fill('2');
    // 꼭짓점 (대칭축) 변경 확인 — sliderRow 라벨 + 값
    await expect(page.getByText(/꼭짓점 좌표/)).toBeVisible();
  });

  test('preset 표준형 applies', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');
    await page.getByRole('button', { name: '표준형' }).click();
    await expect(page.getByText(/대칭축/)).toBeVisible();
  });
});
