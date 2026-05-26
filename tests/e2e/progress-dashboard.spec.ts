import { expect, test, type Page } from '@playwright/test';

const NOW = Date.parse('2026-05-22T09:00:00+09:00');

async function seedProgress(page: Page) {
  await page.addInitScript((now) => {
    window.localStorage.setItem(
      'edu-platform-progress',
      JSON.stringify({
        state: {
          visited: {
            'M9-CR-03': now - 60_000,
            'S9-MA-02': now - 120_000,
          },
          completed: {
            'M9-CR-03': now - 30_000,
          },
          favorites: {
            'M9-CR-03': true,
          },
          reviewQueue: {
            'K-GR-01': {
              reason: 'review',
              dueAt: now - 10_000,
              updatedAt: now - 20_000,
            },
            'S9-MA-02': {
              reason: 'confused',
              dueAt: now + 86_400_000,
              updatedAt: now - 120_000,
            },
          },
          streak: {
            current: 4,
            lastStudiedOn: '2026-05-22',
          },
        },
        version: 1,
      }),
    );
  }, NOW);
}

test.describe('progress dashboard', () => {
  test('renders persisted learning state and survives reload', async ({ page }) => {
    await seedProgress(page);
    await page.goto('/progress');

    await expect(page.getByRole('heading', { name: '학습 현황' })).toBeVisible();
    await expect(page.getByTestId('progress-dashboard')).toBeVisible();
    await expect(page.getByText('완료한 단원')).toBeVisible();
    await expect(page.getByText('연속 탐구')).toBeVisible();
    await expect(page.getByText('4일')).toBeVisible();
    await expect(page.getByRole('heading', { name: '복습 큐' })).toBeVisible();
    await expect(page.getByText('K-GR-01').first()).toBeVisible();
    await expect(page.getByText('M9-CR-03').first()).toBeVisible();
    await expect(page.getByTestId('subject-progress-math')).toContainText('수학');

    await page.reload();
    await expect(page.getByText('4일')).toBeVisible();
    await expect(page.getByText('M9-CR-03').first()).toBeVisible();
  });

  test('home progress links into the dashboard', async ({ page }) => {
    await seedProgress(page);
    await page.goto('/');

    await page.getByRole('link', { name: '전체 진도 보기' }).click();
    await expect(page).toHaveURL(/\/progress$/);
    await expect(page.getByRole('heading', { name: '학습 현황' })).toBeVisible();
  });
});
