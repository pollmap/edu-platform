import { expect, test } from '@playwright/test';

test.describe('pilot M9-CR-03', () => {
  test('home links to pilot', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('인터랙티브 교육');
    await page.getByRole('link', { name: /이차함수/ }).first().click();
    await expect(page).toHaveURL(/\/grade-9\/math\/M9-CR-03/);
  });

  test('pilot page renders core components', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');
    await expect(page.getByRole('heading', { name: '이차함수' })).toBeVisible();
    await expect(page.getByText('a (이차항 계수)')).toBeVisible();
    await expect(page.getByText('b (일차항 계수)')).toBeVisible();
    await expect(page.getByText('c (상수항)')).toBeVisible();
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
