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

  const cart = await test.step("Check for cart icon", async () => {
    const cart = page.getByAltText("cart");
    await expect(cart).toBeFocused;
    return cart;
  });

  const logout = await test.step("Check for cart icon", async () => {
    const logout = page.getByAltText("logout");
    await expect(logout).toBeFocused;
    return logout;
  });

  await logout.click();
  await page.waitForURL("http://localhost:3000");
});
