import { cartProductRepository } from "../backend/src/repository/repository";
import { userCartTest } from "./fixtures/user-cart-fixture";
import { userLoginTest } from "./fixtures/user-login-fixture";
import { CartPage } from "./page-objects/cart-page";
import { expect } from "@playwright/test";

userCartTest("User adds a product from Shop page", async ({ cartPage }) => {
  const productId = 4;
  const expectedPrice = await cartPage.addProductReturnPriceFromShop(productId);
  const totalValue = await cartPage.cartTotal.innerText();
  await expect(totalValue).toEqual(expectedPrice);
});

// User increments product from cart
// userCartTest(
//   "User increments and decrements product quantity from cart",
//   async ({ cartPage }) => {
//     const productId = 4
//     await cartPage.addProductFromShop(productId);
//     const totalValue = await cartPage.cartTotal.innerText();
//     await expect(totalValue).toEqual("9.00");
//   }
// );
// User decrements product from cart
// User decrements product to zero and then increases from cart
