const { expect } = require("@playwright/test");
require("dotenv").config();

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.header = this.page.getByRole("heading");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/auth/login");
    await expect(this.header).toHaveText("Account Login");
  }

  async login() {
    await this.page.getByLabel("Email").click();
    await this.page.getByLabel("Email").fill(process.env.username);
    await this.page.getByLabel("Password").click();
    await this.page.getByLabel("Password").fill(process.env.password);
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.waitForTimeout(100);
    await this.page.waitForURL("http://localhost:3000");
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText("Welcome to the store!");
  }

  async logout() {
    await this.page.getByAltText("logout").click();
    await this.page.waitForURL("http://localhost:3000");
    await expect(this.header).toHaveText("Welcome to the store!");
  }
}
