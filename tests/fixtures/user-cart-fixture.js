import { CartPage } from "../page-objects/cart-page";
import { userLoginTest } from "./user-login-fixture";

export const userCartTest = userLoginTest.extend({
  cartPage: async ({ loginPage }, use) => {
    const cartPage = new CartPage(loginPage.page);
    await cartPage.goto();
    await cartPage.clearCart();
    await use(cartPage);
    await cartPage.clearCart();
  },
});
