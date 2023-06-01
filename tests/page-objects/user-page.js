const { expect } = require("@playwright/test");
require("dotenv").config();

export class UserPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByTestId("page-name");
    this.userEmail = "john@email";
    this.newUserEmail = "notjohn@email";
  }

  async goto() {
    await this.page.goto("http://localhost:3000/user");
    await expect(this.header).toHaveText("Profile Details");
  }

  async updateEmail(newEmail) {
    await this.page.getByAltText("edit-email").click();
    await this.page.locator('input[name="email-input"]').click();
    await this.page.locator('input[name="email-input"]').fill(newEmail);
    await this.page.getByAltText("email-submit").click();
    const toast = this.page.getByText("Email has been updated");
    expect(toast).toBeVisible;
    await this.page.getByRole("button", { name: "Close" }).click();
  }

  async checkEmailChange(expectedValue) {
    await this.page.reload();
    await this.page.waitForURL("http://localhost:3000/user");
    const emailValue = await this.page.getByTestId("user-email").innerText();
    await expect(emailValue).toEqual(expectedValue);
  }
}
