const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { exec } = require("child_process");
const { products } = require("../prisma/seedData");

let cookie;
let userId;
let userEmail = "user@email.com";
let userName = "newUser";
let userPassword = "aPassword";

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {});

beforeEach(async () => {
  // clear database tables
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);

  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);

  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);

  // add products
  await Promise.all(
    products.map(async (product) => {
      await prisma.product.create({
        data: product,
      });
    })
  );

  // register the test user
  let user = {
    email: userEmail,
    userName: userName,
    password: userPassword,
  };
  await request(app).post("/auth/register").send(user);
  // confirm registered test user id
  const confirmUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  userId = confirmUser.id;

  // add cartProducts for user
  await prisma.cartProduct.create({
    data: { userId: userId, productId: 1, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: userId, productId: 2, quantity: 2 },
  });

  // log user in and set cookie
  const userLogin = {
    email: userEmail,
    password: userPassword,
  };
  const response = await request(app).post("/auth/login").send(userLogin);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the user out after each test
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("User gets all cart products", async () => {
  const response = await request(app).get("/cart/").set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  expect(response.body.cart.length).toEqual(2);
});

test("User adds a new cart product to their cart", async () => {
  const newProduct = {
    userId: userId,
    productId: 3,
    quantity: 1,
  };
  const response = await request(app)
    .post("/cart/")
    .set("Cookie", cookie)
    .send(newProduct);
  expect(response.statusCode).toEqual(201);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: userId },
  });
  expect(newUserProducts.length).toEqual(3);
});

test("User removes a cart product", async () => {
  const removeProduct = {
    userId: userId,
    productId: 1,
    quantity: 0,
  };
  const response = await request(app)
    .post("/cart/")
    .set("Cookie", cookie)
    .send(removeProduct);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: userId },
  });
  expect(newUserProducts.length).toEqual(1);
});

test("User clears their entire cart", async () => {
  const response = await request(app).delete("/cart/").set("Cookie", cookie);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: userId },
  });
  expect(newUserProducts.length).toEqual(0);
});
