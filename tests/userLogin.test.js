import { test, expect } from "@playwright/test";
import { LoginPage } from "./page-objects/login-page";

test("Nav bar has icons for cart and logout after signing in", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  const cart = page.getByAltText("cart");
  await expect.soft(cart).toBeVisible();

  const user = page.getByAltText("user");
  await expect.soft(user).toBeVisible();

  const logout = page.getByAltText("logout");
  await expect(logout).toBeVisible();

  await loginPage.logout();
});
