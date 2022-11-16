const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { exec } = require("child_process");

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  // clear and seed the Product and User tables
  // await prisma.$executeRawUnsafe(
  //   `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  // );
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);
  // await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  // await exec("node ./prisma/seed.js");

  // Clear and seed CartProduct table
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);
  await prisma.cartProduct.create({
    data: { userId: 1, productId: 1, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: 1, productId: 2, quantity: 2 },
  });
  await prisma.cartProduct.create({
    data: { userId: 2, productId: 3, quantity: 1 },
  });
  await prisma.cartProduct.create({
    data: { userId: 2, productId: 2, quantity: 3 },
  });
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);
});

let userId;
let cookie;

beforeEach(async () => {
  const userLogin = {
    email: "john@goods.com",
    password: "stuff",
  };
  const dbUser = await prisma.user.findUnique({
    where: { email: userLogin.email },
  });
  userId = dbUser.id;

  const response = await request(app).post("/auth/login").send(userLogin);
  console.log(response.headers["set-cookie"]);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("A user logs in", async () => {
  const res = await request(app).get(`/users/${userId}`).set("Cookie", cookie);
  console.log(res.body);
  expect(res.statusCode).toEqual(200);
});

test("A user can access their user page", async () => {
  const response = await request(app)
    .get(`/users/${userId}`)
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.body).toBeDefined();
});

test("Logged in userId:1 can get all cart products for userId:1", async () => {
  const response = await request(app).get("/cart/2").set("Cookie", cookie);
  console.log(response.body);
  // expect(response.statusCode).toEqual(200);
  expect(response.body.cart.length).toEqual(2);
});

test("Logged in userId:1 cannot get cart products for userId:2", async () => {
  const response = await request(app).get("/cart/1").set("Cookie", cookie);
  expect(response.statusCode).toEqual(401);
});

// test("The user logs out", async () => {
//   const response = await request(app).post("/auth/logout");
//   expect(response.statusCode).toEqual(302);
// });
