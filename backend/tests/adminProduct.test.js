const request = require("supertest");
const assert = require("assert");
const app = require("../src/app");
const { prisma } = require("../repository/repository");
const { response } = require("../src/app");

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product";`);
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

test("update a product", async () => {
  const productId = 1;
  const updatedProduct = {
    productName: "updatedName",
    description: "",
    price: 7.0,
  };
  const response = await request(app)
    .put(`/products/${productId}`)
    .send(updatedProduct);
  expect(response.statusCode).toEqual(200);
  expect(response.body.product.name).toEqual(updatedProduct.productName);
  expect(Number(response.body.product.price)).toEqual(updatedProduct.price);
});

test("delete a product", async () => {
  const productId = 1;
  const response = await request(app).delete(`/products/${productId}`);
  expect(response.statusCode).toEqual(204);
});
