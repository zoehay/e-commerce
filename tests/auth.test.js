const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");

afterAll(async () => {
  await prisma.$disconnect();
});

const user = {
  email: "casfdn@email",
  userName: "Irwin",
  password: "vombat",
};

test("a user is registered successfully", async () => {
  const response = await request(app).post("/auth/register").send(user);
  expect(response.statusCode).toEqual(302);
  expect(response.headers.location).toContain("/users");
});

test("the registered user logs in", async () => {
  const login = {
    email: user.email,
    password: user.password,
  };
  const response = await request(app).post("/auth/login").send(login);
  expect(response.statusCode).toEqual(302);
  expect(response.headers.location).toContain("/users");
});

test("the registered user logs out", async () => {
  const response = await request(app).post("/auth/logout");
  expect(response.statusCode).toEqual(302);
  expect(response.headers.location).toContain("/auth/login");
});
