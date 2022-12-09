const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../src/repository/repository");

afterAll(async () => {
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User";`);
  await prisma.$disconnect();
});

const user1 = {
  email: "newemail@email",
  userName: "first last",
  password: "hash this",
};

test("a user is added successfully", async () => {
  const response = await request(app).post("/users").send(user1);
  expect(response.statusCode).toEqual(201);
  expect(response.body.user.id).toBeDefined();
});

test("get all users", async () => {
  const response = await request(app).get("/users");
  expect(response.body.users).toBeDefined();
  expect(response.body.users.length).toEqual(1);
});

test("get a user by id", async () => {
  const userId = 1;
  const response = await request(app).get(`/users/${userId}`);
  expect(response.statusCode).toEqual(200);
  expect(response.body.user.id).toEqual(userId);
});

test("get user by email", async () => {
  const email = "newemail@email";
  const response = await request(app)
    .get(`/users/search`)
    .query({ email: email });
  expect(response.statusCode).toEqual(200);
  expect(response.body.user).toBeDefined();
});

test("update a user", async () => {
  const userId = 1;
  const updatedUser = {
    email: "newemail@email",
    userName: "updatedName",
    password: "",
  };
  const response = await request(app).put(`/users/${userId}`).send(updatedUser);
  expect(response.statusCode).toEqual(200);
  expect(response.body.user.name).toEqual(updatedUser.userName);
  expect(response.body.user.email).toEqual(updatedUser.email);
});

test("delete a user", async () => {
  const userId = 1;
  const response = await request(app).delete(`/users/${userId}`);
  expect(response.statusCode).toEqual(204);
});
