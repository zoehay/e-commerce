const request = require("supertest");
const assert = require("assert");
const app = require("../src/app");
const { prisma } = require("../repository/repository");

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "test" CASCADE;`);
  await prisma.$disconnect();
});

const product1 = {
  productName: "aNewProductName",
  description: "aNewProductDescription",
  price: 1.0,
};

test("a product is added successfully", async () => {
  const response = await request(app).post("/products").send(product1);
  expect(response.statusCode).toEqual(201);
  expect(response.body.product.id).toBeDefined();
});

test("correct list of products returned", async () => {
  const response = await request(app).get("/products");
  expect(response.body).toBeDefined();
  expect(response.body.products.length).toEqual(1);
});

test("get a product by id", async () => {
  const response = await request(app).get("/products/1");
  expect(response.statusCode).toEqual(200);
  expect(response.body).toBeDefined();
});
