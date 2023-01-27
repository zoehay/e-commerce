const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../src/repository/repository");
const { exec } = require("child_process");
const { products } = require("../prisma/seedData");

let cookie;
let user1Id;
let user1Email = "user@email.com";
let user1Name = "newUser";
let user1Password = "aPassword";

let cookie2;
let user2Id;
let user2Email = "user2@email.com";
let user2Name = "newUser2";
let user2Password = "aPassword2";

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

  // register the test user1
  let user1 = {
    email: user1Email,
    userName: user1Name,
    password: user1Password,
  };
  await request(app).post("/auth/register").send(user1);
  // confirm registered test user id
  const confirmUser1 = await prisma.user.findUnique({
    where: { email: user1Email },
  });
  user1Id = confirmUser1.id;

  // register the test user2
  let user2 = {
    email: user2Email,
    userName: user2Name,
    password: user2Password,
  };
  await request(app).post("/auth/register").send(user2);
  // confirm registered test user id
  const confirmUser2 = await prisma.user.findUnique({
    where: { email: user2Email },
  });
  user2Id = confirmUser2.id;

  // add cartProducts for user
  await prisma.cartProduct.create({
    data: { userId: user1Id, productId: 1, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: user1Id, productId: 2, quantity: 2 },
  });
  await prisma.cartProduct.create({
    data: { userId: user2Id, productId: 3, quantity: 2 },
  });

  // log user in and set cookie
  const userLogin = {
    email: user1Email,
    password: user1Password,
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

test("User gets all cartProduct details", async () => {
  console.log("DETAILS");
  const response = await request(app)
    .get("/cart/details")
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  console.log(response.body);
  expect(response.body.cart[0].product.name).toBeDefined();
});

test("User adds a new cart product to their cart", async () => {
  const newProduct = {
    userId: user1Id,
    productId: 3,
    quantity: 1,
  };
  const response = await request(app)
    .post("/cart/")
    .set("Cookie", cookie)
    .send(newProduct);
  expect(response.statusCode).toEqual(201);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: user1Id },
  });
  expect(newUserProducts.length).toEqual(3);
});

test("User removes a cart product", async () => {
  const removeProduct = {
    userId: user1Id,
    productId: 1,
    quantity: 0,
  };
  console.log("REMOVEEEE");
  const response = await request(app)
    .post("/cart/")
    .set("Cookie", cookie)
    .send(removeProduct);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: user1Id },
  });
  expect(newUserProducts.length).toEqual(1);
});

test("User clears their entire cart", async () => {
  const response = await request(app).delete("/cart/").set("Cookie", cookie);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: user1Id },
  });
  expect(newUserProducts.length).toEqual(0);
});

test("Other user gets their cart product details", async () => {
  // logout  user1
  const logoutresponse = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);

  // login user2
  const user2Login = {
    email: user2Email,
    password: user2Password,
  };
  const loginresponse = await request(app).post("/auth/login").send(user2Login);
  cookie2 = loginresponse.headers["set-cookie"];
  const response = await request(app)
    .get("/cart/details")
    .set("Cookie", cookie2);
  expect(response.statusCode).toEqual(200);
  console.log(response.body);
  expect(response.body.cart[0].product.name).toBeDefined();
});
