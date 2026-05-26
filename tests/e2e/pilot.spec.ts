import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function setSlider(page: Page, index: number, value: number) {
  const slider = page.getByRole('slider').nth(index);
  await slider.focus();

  const current = Number(await slider.inputValue());
  const step = Number(await slider.getAttribute('step')) || 1;
  const key = value >= current ? 'ArrowRight' : 'ArrowLeft';
  const presses = Math.round(Math.abs(value - current) / step);

  for (let press = 0; press < presses; press += 1) {
    await page.keyboard.press(key);
  }

  await expect(slider).toHaveValue(String(value));
}

test.describe('pilot M9-CR-03', () => {
  test('home links to pilot', async ({ page }) => {
    await page.goto('/');
    const pilotLink = page.locator('a[href="/grade-9/math/M9-CR-03"]').first();

    await expect(pilotLink).toBeVisible();
    await pilotLink.click();
    await expect(page).toHaveURL(/\/grade-9\/math\/M9-CR-03/);
  });

  test('pilot page renders blueprint material and pattern engine', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    await expect(page.getByText('M9-CR-03').first()).toBeVisible();
    await expect(page.getByText('Source-backed unit content')).toBeVisible();
    await expect(page.getByText('M9-CR-03 row in docs/00-MASTER-INDEX.md')).toBeVisible();
    await expect(page.getByText('Pattern engine')).toBeVisible();
    await expect(page.getByText('a coefficient')).toBeVisible();
    await expect(page.getByText('b coefficient')).toBeVisible();
    await expect(page.getByText('c intercept')).toBeVisible();
    await expect(page.getByText('y = 1x^2 + 0x + 0')).toBeVisible();
    await expect(page.getByRole('slider')).toHaveCount(3);
  });

  test('slider changes update formula display', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    await setSlider(page, 0, 2);
    await expect(page.getByText('y = 2x^2 + 0x + 0')).toBeVisible();
  });

  test('reset restores pilot coefficients', async ({ page }) => {
    await page.goto('/grade-9/math/M9-CR-03');

    await setSlider(page, 1, 4);
    await expect(page.getByText('y = 1x^2 + 4x + 0')).toBeVisible();
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByText('y = 1x^2 + 0x + 0')).toBeVisible();
  });
});
