// import { test } from "./fixtures/login-fixture";
import { test } from "@playwright/test";
import { LoginPage } from "./page-objects/login-page";
import { UserPage } from "./page-objects/user-page";

test("User updates email", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  const userPage = new UserPage(page);
  await userPage.goto();
  await userPage.updateEmail("notjohn@email");
  await userPage.checkEmailChange("notjohn@email");
  await userPage.updateEmail("john@email");
  await userPage.checkEmailChange("john@email");

  await loginPage.logout();
});
