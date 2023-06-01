import { UserPage } from "../page-objects/user-page";

const base = require("@playwright/test");
const { LoginPage } = require("../page-objects/login-page");

export const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await use(page);
    await loginPage.logout();
  },
});
