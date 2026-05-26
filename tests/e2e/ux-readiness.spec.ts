import { expect, test } from '@playwright/test';

test.describe('UX readiness surfaces', () => {
  test('search modal opens and Enter navigates to a result', async ({ page }, testInfo) => {
    await page.goto('/');

    if (testInfo.project.name === 'mobile-360') {
      await page.getByRole('button', { name: '단원 검색' }).click();
    } else {
      await page.keyboard.press('/');
    }
    const dialog = page.getByRole('dialog', { name: '단원 검색' });
    await expect(dialog).toBeVisible();

    await page.getByLabel('검색어').fill('M9-CR-03');
    await expect(dialog.getByText('M9-CR-03').first()).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/grade-9\/math\/M9-CR-03$/);
  });

  test('progress actions persist into the home progress surface', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    await page.getByRole('button', { name: '학습 완료로 표시' }).click();
    await expect(page.getByRole('button', { name: '✓ 학습 완료' })).toBeVisible();

    await page.getByRole('button', { name: '즐겨찾기 추가' }).click();
    await expect(page.getByRole('button', { name: '즐겨찾기 해제' })).toBeVisible();

    await page.goto('/');
    await expect(page.getByText('내 학습 진도')).toBeVisible();
    await expect(page.getByText(/완료 1 · 방문/)).toBeVisible();
    await expect(page.getByText(/즐겨찾기 1/)).toBeVisible();
    await expect(page.getByText('M9-CR-03').first()).toBeVisible();
  });

  test('self-check review state feeds the daily review queue', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    await page.getByRole('button', { name: /다시 볼래요/ }).click();
    await expect(page.getByText('오늘 복습 큐에 저장했어요.')).toBeVisible();

    await page.goto('/');
    await expect(page.getByText('다시 볼 개념')).toBeVisible();
    await expect(page.getByText('M9-CR-03').first()).toBeVisible();
  });

  test('roadmap preview renders verified prerequisite and next-unit links', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    const roadmap = page.getByTestId('roadmap-preview').first();
    await expect(roadmap).toBeVisible();
    await expect(roadmap).toContainText('학습 경로 미리보기');
    await expect(roadmap).toContainText('M8-CR-04');
    await expect(roadmap).toContainText('M9-CR-01');
    await expect(roadmap).toContainText('현재 단원');
  });
});
