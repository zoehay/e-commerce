import { test, expect } from "@playwright/test";
import LoginPage from "./page-objects/login-page";

test("Nav bar should have icons for cart and logout after signing in", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  await page.waitForURL("http://localhost:3000");

  const cart = page.getByAltText("cart");
  await expect.soft(cart).toBeVisible();

  const user = page.getByAltText("user");
  await expect.soft(user).toBeVisible();

  const logout = page.getByAltText("logout");
  await expect(logout).toBeVisible;

  await logout.click();
  await page.waitForURL("http://localhost:3000");
});
