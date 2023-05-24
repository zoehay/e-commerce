const { expect } = require("@playwright/test");
require("dotenv").config();

export class UserPage {
  constructor(page) {
    this.page = page;
    this.header = this.page.getByRole("heading");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/user");
    await expect(this.header).toHaveText("Profile Details");
  }

  async updateEmail() {
    await page.getByAltText("edit-email").click;
    await page.getByLabel("Update Email").click();
    await page.getByLabel("Update Email").fill("notjohn@email");
    await page.getByRole("button", { name: "Submit" }).click();
    const toastMessage = page.getByText("Email has been updated");
    expect(toast).toBeVisible;
    await page.getByRole("button", { name: "Close" }).click();
  }

  async revertEmail() {
    await page.getByAltText("edit-email").click;
    await page.getByLabel("Update Email").click();
    await page.getByLabel("Update Email").fill("john@email");
    await page.getByRole("button", { name: "Submit" }).click();
    const toastMessage = page.getByText("Email has been updated");
    expect(toast).toBeVisible;
    await page.getByRole("button", { name: "Close" }).click();
  }
}
