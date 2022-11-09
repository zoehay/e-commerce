const request = require("supertest");
const app = require("../src/app");
const { prisma } = require("../repository/repository");

afterAll(async () => {
  await prisma.$disconnect();
});

const user1 = {
  email: "newemail@email",
  userName: "first last",
  password: "hash this",
};

test("a user is added successfully", async () => {
  const response = await request(app).post("/auth").send(user1);
  expect(response.statusCode).toEqual(201);
});
