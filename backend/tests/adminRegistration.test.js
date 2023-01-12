const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../src/repository/repository");

let cookie;
let userId;
let userEmail = "user@email.com";
let userName = "newUser";
let userPassword = "aPassword";

let user = {
  email: userEmail,
  userName: userName,
  password: userPassword,
};

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  // clear database user table
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);
});

test("a user is registered successfully", async () => {
  const response = await request(app).post("/auth/register").send(user);
  console.log(response.body);
  expect(response.statusCode).toEqual(302);
  const confirmUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  userId = confirmUser.id;
});

test("the registered user logs in", async () => {
  const login = {
    email: user.email,
    password: user.password,
  };
  const response = await request(app).post("/auth/login").send(login);
  console.log(response.body);
  cookie = response.headers["set-cookie"];
  expect(response.statusCode).toEqual(302);
  expect(response.headers.location).toContain("user");
});

test("the registered user logs out", async () => {
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
  console.log(response.body);
  expect(response.statusCode).toEqual(200);
});
