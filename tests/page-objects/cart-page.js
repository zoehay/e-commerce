const { expect } = require("@playwright/test");
require("dotenv").config();

export class CartPage {
  constructor(page) {
    this.page = page;
    this.header = this.page.getByTestId("page-name");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/cart");
    await expect(this.header).toHaveText("My Shopping Cart");
  }
}
