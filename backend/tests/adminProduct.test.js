const request = require("supertest");
const app = require("../src/app");
const {
  prisma,
  productRepository,
  userRepository,
} = require("../src/repository/repository");
const bcrypt = require("bcrypt");

let cookie;

let productName = "ProductName";
let productDescription = "Product Description";
let productPrice = 1.0;

let adminEmail = "admin@email";
let adminName = "Admin";
let adminPassword = "password";

afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  // clear user and session tables
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
});

beforeEach(async () => {
  // clear the product table
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);

  let product = await productRepository.createProduct(
    productName,
    productDescription,
    productPrice
  );

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

test("admin add a product", async () => {
  let testProduct = {
    productName: "testName",
    description: "test description",
    price: 2.0,
  };
  const response = await request(app)
    .post("/admin/products")
    .send(testProduct)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(201);
  expect(response.body.product.id).toEqual(2);
});

test("fail to create a product if no name", async () => {
  let testProduct = {
    description: "test description",
    price: 2.0,
  };
  const response = await request(app)
    .post("/admin/products")
    .send(testProduct)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(400);
});

test("update a product", async () => {
  const productId = 1;
  const updatedProduct = {
    productName: "updatedName",
    price: 7.0,
  };
  const response = await request(app)
    .put(`/admin/products/${productId}`)
    .send(updatedProduct)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  console.log(response.body);
  expect(response.body.product.name).toEqual(updatedProduct.productName);
  expect(response.body.product.description).toEqual(productDescription);
  expect(Number(response.body.product.price)).toEqual(updatedProduct.price);
});

test("delete a product", async () => {
  const productId = 1;
  const beforeProducts = await productRepository.getAllProducts();
  console.log(beforeProducts);
  expect(beforeProducts.length).toEqual(1);
  const response = await request(app)
    .delete(`/admin/products/${productId}`)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(204);
  const products = await productRepository.getAllProducts();
  console.log(products);
  expect(products.length).toEqual(0);
});
