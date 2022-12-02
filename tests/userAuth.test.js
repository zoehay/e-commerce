const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { isExportDeclaration } = require("typescript");

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
  // clear database user table
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);

  // register the test user
  let user = {
    email: userEmail,
    userName: userName,
    password: userPassword,
  };
  console.log(user);
  await request(app).post("/auth/register").send(user);
  // confirm registered test user id
  const confirmUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  userId = confirmUser.id;

  // log user in and set cookie
  const userLogin = {
    email: userEmail,
    password: userPassword,
  };
  const response = await request(app).post("/auth/login").send(userLogin);
  console.log("good login", response);
  cookie = response.headers["set-cookie"];
});

afterEach(async () => {
  // log the user out after each test
  const response = await request(app)
    .post("/auth/logout")
    .set("Cookie", cookie);
});

test("Logged in user gets all of their account information", async () => {
  const response = await request(app).get("/user").set("Cookie", cookie);
  console.log(response.body);
  expect(response.body.user.email).toEqual(userEmail);
});

test("Logged in user updates their name", async () => {
  const updateInfo = { userName: "updatedUserName" };
  const response = await request(app)
    .put("/user")
    .set("Cookie", cookie)
    .send(updateInfo);
  console.log(response.body);
  expect(response.statusCode).toEqual(200);
  const confirmUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  console.log(confirmUser);
  expect(confirmUser.name).toEqual(updateInfo.userName);
});

test("Logged in user updates their email", async () => {
  const updateInfo = { email: "aNewEmail@email.com" };
  const response = await request(app)
    .put("/user")
    .set("Cookie", cookie)
    .send(updateInfo);
  console.log(response.body);
  expect(response.statusCode).toEqual(200);
  const confirmUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  console.log(confirmUser);
  expect(confirmUser.email).toEqual(updateInfo.email);
});

test("Logged in user updates their password", async () => {
  const updateInfo = { password: "aNewPassword" };
  const response = await request(app)
    .put("/user")
    .set("Cookie", cookie)
    .send(updateInfo);
  console.log(response.body);
  expect(response.statusCode).toEqual(200);
  // confirm login still works

  console.log("not logged out");

  const getResponse = await request(app).get("/user").set("Cookie", cookie);
  console.log(getResponse.body);

  console.log("logout");

  await request(app).post("/auth/logout").set("Cookie", cookie);

  const userLogin = {
    email: userEmail,
    password: updateInfo.password,
  };
  const loginResponse = await request(app).post("/auth/login").send({
    email: userEmail,
    password: "wrong",
  });
  cookie = loginResponse.headers["set-cookie"];
  console.log(loginResponse);

  console.log("failure login");
  const failgetresponse = await request(app).get("/user").set("Cookie", cookie);
  console.log(failgetresponse.body);
});
