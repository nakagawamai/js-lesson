import { test, expect } from '@playwright/test';

test('If all inputs are correct and the checkbox agreeing to the terms of use is checked, the user will be registered', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');
    await page.getByLabel('お名前*').click();
    await page.getByLabel('お名前*').fill('なかがわまい');
    await page.getByLabel('メールアドレス*').click();
    await page.getByLabel('メールアドレス*').fill('sample@sample.com');
    await page.getByLabel('パスワード*').click();
    await page.getByLabel('パスワード*').fill('abcde12345A');
    await page.getByRole('button', { name: 'パスワードを表示' }).click();
    await page.getByRole('button', { name: '利用規約' }).click();
    await page.getByTestId('lastText').scrollIntoViewIfNeeded();
    await page.getByText('利用規約を最後まで読み、同意する').click();
    await page.getByRole('button', { name: '会員登録する' }).click();
    await page.screenshot({ path: "./src/tests/register-done.png" });
});

test('if the email address is already registered, display an error message', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');
    await page.getByLabel('お名前*').click();
    await page.getByLabel('お名前*').fill('なかがわまい');
    await page.getByLabel('メールアドレス*').click();
    await page.getByLabel('メールアドレス*').fill('sample@sample.com');
    await page.getByLabel('パスワード*').click();
    await page.getByLabel('パスワード*').fill('abcde12345A');
    await page.getByRole('button', { name: 'パスワードを表示' }).click();
    await page.getByRole('button', { name: '利用規約' }).click();
    await page.getByTestId('lastText').scrollIntoViewIfNeeded();
    await page.getByText('利用規約を最後まで読み、同意する').click();
    await page.getByRole('button', { name: '会員登録する' }).click();
    await page.getByRole('link', { name: 'ログインはこちら' }).click();
    await page.getByRole('link', { name: '会員登録がまだの方はこちら' }).click();


    //input same email address.
    await page.getByLabel('お名前*').click();
    await page.getByLabel('お名前*').fill('なかがわまい');
    await page.getByLabel('メールアドレス*').click();
    await page.getByLabel('メールアドレス*').fill('sample@sample.com');
    await page.getByLabel('パスワード*').click();
    await page.getByLabel('パスワード*').fill('abcde12345A');
    await page.getByRole('button', { name: 'パスワードを表示' }).click();
    await page.getByRole('button', { name: '利用規約' }).click();
    await page.getByTestId('lastText').scrollIntoViewIfNeeded();
    await page.getByText('利用規約を最後まで読み、同意する').click();
    await page.getByRole('button', { name: '会員登録する' }).click();

    await page.screenshot({ path: "./src/tests/register-email-error.png" });
});
