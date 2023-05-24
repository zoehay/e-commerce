import { test } from "./fixtures/login-fixture";
import { LoginPage } from "./page-objects/login-page";
import { UserPage } from "./page-objects/user-page";

test("User updates name", async ({ loginPage, page }) => {
  const userPage = new UserPage(page);
  await userPage.goto();
  await page.getByAltText("edit-email").click();
});
