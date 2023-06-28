import { expect } from "@playwright/test";
require("dotenv").config();

export class CartPage {
  constructor(page) {
    this.page = page;
    this.header = this.page.getByTestId("page-name");
    this.cartTotal = this.page.getByTestId("cart-total");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/cart");
    await expect(this.header).toHaveText("My Shopping Cart");
  }

  async clearCart() {
    await this.page.getByRole("button", { name: "Clear Cart" }).click();
    await this.page.getByTestId("cart-total").click();
    const totalValue = await this.cartTotal.innerText();
    await expect(totalValue).toEqual("0.00");
  }

  async addProductReturnPriceFromShop(productId) {
    await this.page.getByRole("link", { name: "Shop" }).click();
    await this.page.waitForURL("http://localhost:3000/products");
    await this.page.getByTestId(`add-product-${productId}`).click();
    const priceElement = await this.page.getByTestId(
      `product-price-${productId}`
    );
    const price = await priceElement.innerText();
    const expectedPrice = Math.round((Number(price) * 100) / 100).toFixed(2);
    await this.goto();
    return expectedPrice;
  }
}
