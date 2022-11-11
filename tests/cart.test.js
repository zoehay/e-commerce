const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { exec } = require("child_process");

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  // clear and seed the Product and User databases
  // await prisma.$executeRawUnsafe(
  //   `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  // );
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);
  // await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  // await exec("node ./prisma/seed.js");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);

  // TODO add login process
});

beforeEach(async () => {
  // Add some cart products for the user
});

test("A new product is added to the user cart", async () => {
  const newCartProduct = {
    userId: 1,
    productId: 2,
    quantity: 1,
  };
  const response = await request(app).post("/cart").send(newCartProduct);
  expect(response.statusCode).toEqual(201);
});

// test("A cart product is removed");

// test("All of the cart products for a user are retrieved");

// test("All of the cart products for a user are cleared");

// test("The quantity of an exisiting cart product is increased");

// test("The quantity of an existing cart product is set to zero to delete it");
