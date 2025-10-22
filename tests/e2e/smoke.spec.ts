import { expect, test } from '@playwright/test';

test('loads the fintech development page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Origin Fintech Development' })).toBeVisible();
  await expect(
    page.getByText(/building beautiful fintech experiences/i),
  ).toBeVisible();
});
