const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { exec } = require("child_process");

let cookie;
let userId;
let userEmail = "john@goods.com";
let userPassword = "stuff";
let nonAuthId;
let nonAuthEmail = "fletch@email.com";

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

  // user Id of user to authorize
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  userId = user.id;
  // user Id of a different user
  const nonAuthUser = await prisma.user.findUnique({
    where: { email: nonAuthEmail },
  });
  nonAuthId = nonAuthUser.id;
});

beforeEach(async () => {
  // log user in before each test
  const userLogin = {
    email: userEmail,
    password: userPassword,
  };

  const response = await request(app).post("/auth/login").send(userLogin);
  console.log(response.headers["set-cookie"]);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the user out after each test
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("Logged in user gets all of their account information", async () => {
  const response = await request(app)
    .get(`/users/${userId}`)
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.body).toBeDefined();
});

test("Logged out user cannot access account information");

test("Logged in user cannot get account information for another account");

test("Logged in user updates their name");

test("Logged in user updates their password");
