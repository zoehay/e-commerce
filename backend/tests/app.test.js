const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../src/repository/repository");

let cookie;
let userId;
let userEmail = "john@goods.com";
let userPassword = "stuff";
let nonAuthId;
let nonAuthEmail = "fletch@email.com";

afterAll(async () => {
  // clear and seed the Product and User tables
  // await prisma.$executeRawUnsafe(
  //   `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  // );
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);
  // await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  // await exec("node ./prisma/seed.js");
  // console.log("db seed");
  console.log("disconnecting");
  await prisma.$disconnect();
  console.log("after disconnect");
});

test("Logged in user gets their account information", async () => {
  console.log("test");
});
