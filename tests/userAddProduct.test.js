import { cartProductRepository } from "../backend/src/repository/repository";
import { userCartTest } from "./fixtures/user-cart-fixture";
import { userLoginTest } from "./fixtures/user-login-fixture";
import { CartPage } from "./page-objects/cart-page";
import { expect } from "@playwright/test";

userCartTest("User adds a product from Shop page", async ({ cartPage }) => {
  await cartPage.addProductFromShop();
  const totalValue = await cartPage.cartTotal.innerText();
  await expect(totalValue).toEqual("9.00");
});

// User increments product from cart
// User decrements product from cart
// User decrements product to zero and then increases from cart
