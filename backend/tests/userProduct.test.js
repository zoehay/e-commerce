const request = require("supertest");
const app = require("../src/app");
const { prisma, userRepository } = require("../src/repository/repository");
const bcrypt = require("bcrypt");

let cookie;

let userEmail = "user@email.com";
let userName = "newUser";
let userPassword = "aPassword";

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {});

beforeEach(async () => {
  // clear database user table
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);

  // register test user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedUserPassword = await bcrypt.hash(userPassword, salt);
    const user = await userRepository.createUser(
      userEmail,
      userName,
      hashedUserPassword
    );
  } catch (e) {
    console.log(e);
  }

  // log user in and set cookie
  const userLogin = {
    email: userEmail,
    password: userPassword,
  };
  const response = await request(app).post("/auth/login").send(userLogin);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the admin user out after each test
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("get all products", async () => {
  const response = await request(app).get("/products");
  expect(response.body.products).toBeDefined();
  expect(response.body.products.length).toEqual(1);
});

test("get a product by id", async () => {
  const productId = 1;
  const response = await request(app).get(`/products/${productId}`);
  expect(response.statusCode).toEqual(200);
  expect(response.body.product.id).toEqual(productId);
});

test("get product search results by name", async () => {
  const searchQuery = "new";
  const response = await request(app)
    .get(`/products/search`)
    .query({ searchName: searchQuery });
  expect(response.statusCode).toEqual(200);
  expect(response.body.products).toBeDefined();
});
