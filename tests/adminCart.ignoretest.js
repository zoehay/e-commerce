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
  // TODO add login process
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);
  await prisma.cartProduct.create({
    data: { userId: 1, productId: 1, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: 1, productId: 2, quantity: 2 },
  });
});

test("All of the cart products for a user are retrieved", async () => {
  const response = await request(app).get("/cart/1");
  expect(response.statusCode).toEqual(200);
  expect(response.body.cart.length).toEqual(2);
});

test("A new product is added to the user cart", async () => {
  const newCartProduct = {
    userId: 1,
    productId: 3,
    quantity: 1,
  };
  const response = await request(app).post("/cart").send(newCartProduct);
  expect(response.statusCode).toEqual(201);
});

test("The quantity of an exisiting cart product is increased", async () => {
  const updateCartProduct = {
    userId: 1,
    productId: 1,
    quantity: 3,
  };
  const response = await request(app).post("/cart").send(updateCartProduct);
  console.log("update", response.body);
  expect(response.statusCode).toEqual(200);
});

test("The quantity of an existing cart product is set to zero to delete it", async () => {
  const deleteCartProduct = {
    userId: 1,
    productId: 1,
    quantity: 0,
  };
  const response = await request(app).post("/cart").send(deleteCartProduct);
  console.log("deleted", response.body);
  expect(response.statusCode).toEqual(204);
});

test("All of the cart products for a user are cleared", async () => {
  const response = await request(app).delete("/cart/1");
  expect(response.statusCode).toEqual(204);
});
