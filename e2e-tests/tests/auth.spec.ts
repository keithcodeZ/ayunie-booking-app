import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"


test('should allow the user to sign in', async ({ page }) => {

  await page.goto(UI_URL);

  //get the sign in button

  const signInButton = page.getByRole('link', { name: 'Sign In' });
  await signInButton.click();

  //check if we're at the Sign In page by checking if the heading is visible
  const signInHeading = page.getByRole('heading', { name: 'Sign In' });
  await expect(signInHeading).toBeVisible();
  //same as the one above
  // await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name='email']").fill('1@1.com');
  await page.locator("[name='password']").fill('password123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText("Sign in successful")).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Properties' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();

  // await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test("should allow user to register", async ({ page }) => {

  const testEmail = `test_register${Math.floor(Math.random() * 90000) + 10000}@test.com`;

  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an account here' }).click();

  const signInHeading = page.getByRole('heading', { name: 'Create an Account' });
  await expect(signInHeading).toBeVisible();
  await page.locator("[name='firstName']").fill('test_firstName');
  await page.locator("[name='lastName']").fill('test_lastName');
  await page.locator("[name='email']").fill(testEmail);
  await page.locator("[name='password']").fill('password123');
  await page.locator("[name='confirmPassword']").fill('password123');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Properties' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();


})

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
