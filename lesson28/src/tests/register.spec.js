import { test, expect } from '@playwright/test';

test('input username', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');
    await page.getByPlaceholder('山田　太郎').click();
    await page.getByPlaceholder('山田　太郎').fill('なかがわ');
    await page.screenshot({ path: "./src/tests/register-username.png" });
});
