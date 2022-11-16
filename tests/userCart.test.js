const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { exec } = require("child_process");
let authId;
let nonAuthId;
let cookie;
const authUserLogin = {
  email: "john@goods.com",
  password: "stuff",
};

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);
  // user Id of user to authorize
  const authUser = await prisma.user.findUnique({
    where: { email: authUserLogin.email },
  });
  authId = authUser.id;
  // user Id of a different user
  const nonAuthUserEmail = "fletch@email.com";
  const nonAuthUser = await prisma.user.findUnique({
    where: { email: nonAuthUserEmail },
  });
  nonAuthId = nonAuthUser.id;
});

beforeEach(async () => {
  // Clear and seed CartProduct table
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);
  await prisma.cartProduct.create({
    data: { userId: authId, productId: 1, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: authId, productId: 2, quantity: 2 },
  });
  await prisma.cartProduct.create({
    data: { userId: nonAuthId, productId: 3, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: nonAuthId, productId: 2, quantity: 3 },
  });

  // log in known user before each test
  const response = await request(app).post("/auth/login").send(authUserLogin);
  console.log(response.headers["set-cookie"]);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the user out after each test
  // const sessions = await prisma.session.findMany();
  // console.log(sessions);
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
  console.log(response.body);
});

test("Logged in user authUser can get all cart products for authUser", async () => {
  const response = await request(app)
    .get(`/cart/${authId}`)
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.statusCode).toEqual(200);
  expect(response.body.cart.length).toEqual(2);
});

test("Logged in user authUser cannot get cart products for other user, nonAuthUser", async () => {
  const response = await request(app)
    .get(`/cart/${nonAuthId}`)
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.statusCode).toEqual(401);
});

test("Logged in authUser adds a new cart product to their cart", async () => {
  const newProduct = {
    userId: authId,
    productId: 3,
    quantity: 1,
  };
  const response = await request(app)
    .post(`/cart/${authId}`)
    .set("Cookie", cookie)
    .send(newProduct);
  console.log(response.body);
  expect(response.statusCode).toEqual(201);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: authId },
  });
  expect(newUserProducts.length).toEqual(3);
});

test("Logged in authUser removes a cart product", async () => {
  const removeProduct = {
    userId: authId,
    productId: 1,
    quantity: 0,
  };
  const response = await request(app)
    .post(`/cart/${authId}`)
    .set("Cookie", cookie)
    .send(removeProduct);
  console.log(response.body);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: authId },
  });
  expect(newUserProducts.length).toEqual(1);
});

test("Logged in authUser clears their entire cart", async () => {
  const response = await request(app)
    .delete(`/cart/${authId}`)
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.statusCode).toEqual(204);
  const newUserProducts = await prisma.cartProduct.findMany({
    where: { userId: authId },
  });
  expect(newUserProducts.length).toEqual(0);
});
