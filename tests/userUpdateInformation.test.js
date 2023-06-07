import { UserPage } from "./page-objects/user-page";
import { userLoginTest } from "./fixtures/user-login-fixture";

userLoginTest("User updates email", async ({ loginPage }) => {
  const userPage = new UserPage(loginPage.page);
  await userPage.goto();
  await userPage.updateEmail(process.env.changeUsername);
  await userPage.checkEmailChange(process.env.changeUsername);
  await userPage.updateEmail(process.env.username);
  await userPage.checkEmailChange(process.env.username);
});
