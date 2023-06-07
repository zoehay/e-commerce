import { userLoginTest } from "./fixtures/user-login-fixture";
import { CartPage } from "./page-objects/cart-page";

userLoginTest("User adds a Shovel", async ({ loginPage }) => {
  const cartPage = new CartPage(loginPage.page);
  await cartPage.goto();
  await cartPage.page.goTo("http://localhost:3000/products");
});
