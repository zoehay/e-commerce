const base = require("@playwright/test");
import { LoginPage } from "../page-objects/login-page";

export const userLoginTest = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await use(loginPage);
    await loginPage.logout();
  },
});
