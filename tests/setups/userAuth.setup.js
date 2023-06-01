import { test as setup } from "@playwright/test";
require("dotenv").config();
const authFile = "../playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByAltText("user").click();
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(process.env.username);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(process.env.password);
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:3000");
  await page.context().storageState({ path: authFile });
});
