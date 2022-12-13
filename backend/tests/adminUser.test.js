const request = require("supertest");
const app = require("../src/app");
const { prisma, userRepository } = require("../src/repository/repository");
const cp = require("child_process");
const path = require("path");
const bcrypt = require("bcrypt");

let cookie;

let userEmail = "user@email.com";
let userName = "newUser";
let userPassword = "aPassword";

let adminEmail = "admin@email";
let adminName = "Admin";
let adminPassword = "password";

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {});

beforeEach(async () => {
  // clear database user table
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);

  // register an admin user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    const adminUser = await userRepository.createAdminUser(
      adminEmail,
      adminName,
      hashedPassword
    );
  } catch (e) {
    console.log(e);
  }

  // register another test user
  let user = {
    email: userEmail,
    userName: userName,
    password: userPassword,
  };
  await request(app).post("/auth/register").send(user);

  // log admin user in and set cookie
  const adminLogin = {
    email: adminEmail,
    password: adminPassword,
  };
  const response = await request(app).post("/auth/login").send(adminLogin);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the admin user out after each test
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("a user is added successfully", async () => {
  let testUser = {
    email: "test@email",
    userName: "Test",
    password: "testpassword",
  };
  const response = await request(app)
    .post("/admin/users")
    .send(testUser)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(201);
  expect(response.body.user.id).toBeDefined();
});

test("get all users", async () => {
  const response = await request(app).get("/admin/users").set("Cookie", cookie);
  expect(response.body.users).toBeDefined();
  expect(response.body.users.length).toEqual(2);
});

test("get a user by id", async () => {
  const userId = 2;
  const response = await request(app)
    .get(`/admin/users/${userId}`)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  expect(response.body.user.id).toEqual(userId);
});

test("get user by email", async () => {
  const response = await request(app)
    .get("/admin/search")
    .send({ email: userEmail })
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  expect(response.body.user).toBeDefined();
});

test("update a user email and name", async () => {
  const userId = 2;
  const updatedUser = {
    email: "newemail@email",
    userName: "updatedName",
  };
  const response = await request(app)
    .put(`/admin/users/${userId}`)
    .send(updatedUser)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(201);
  expect(response.body.user.name).toEqual(updatedUser.userName);
  expect(response.body.user.email).toEqual(updatedUser.email);
});

test("update a user password", async () => {
  const userId = 2;
  const updatedUser = {
    password: "newPassword",
  };
  const response = await request(app)
    .put(`/admin/users/${userId}`)
    .send(updatedUser)
    .set("Cookie", cookie);
  const setPassword = response.body.user.password;
  const match = await bcrypt.compare(updatedUser.password, setPassword);
  expect(response.statusCode).toEqual(201);
  expect(response.body.user.name).toEqual(userName);
  expect(match).toEqual(true);
});

test("delete a user", async () => {
  const userId = 2;
  const response = await request(app)
    .delete(`/admin/users/${userId}`)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(204);
  const users = await userRepository.getAllUsers();
  expect(users.length).toEqual(1);
});
