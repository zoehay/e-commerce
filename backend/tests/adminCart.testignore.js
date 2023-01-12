const request = require("supertest");
const app = require("../src/app");
const {
  prisma,
  cartProductRepository,
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
  // clear the cart product table
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);
  let cartProduct = await cartProductRepository.addCartProduct({
    data: { userId: 1, productId: 1, quantity: 1 },
  });

  // log in admin user and set cookie
  const adminLogin = {
    email: adminEmail,
    password: adminPassword,
  };
  const response = await request(app).post("/auth/login").send(adminLogin).set;
  cookie = response.headers["set-cookie"];
});

test("admin looks at a user cart", async () => {
  const response = await request(app).get("/cart/1").set("Cookie", cookie);
  expect(response.statusCode).toEqual(200);
  console.log(response.body);
  expect(response.body.cart.length).toEqual(2);
});

test("admin add a product to a user cart", async () => {
  const newCartProduct = {
    userId: 1,
    productId: 3,
    quantity: 1,
  };
  const response = await request(app)
    .post("/cart")
    .send(newCartProduct)
    .set("Cookie", cookie);
  expect(response.statusCode).toEqual(201);
});

test("admin increase quantity in user cart", async () => {
  const updateCartProduct = {
    userId: 1,
    productId: 1,
    quantity: 3,
  };
  const response = await request(app)
    .post("/cart")
    .send(updateCartProduct)
    .set("Cookie", cookie);
  console.log("update", response.body);
  expect(response.statusCode).toEqual(200);
});

test("admin deletes product from user cart", async () => {
  const deleteCartProduct = {
    userId: 1,
    productId: 1,
    quantity: 0,
  };
  const response = await request(app)
    .post("/cart")
    .send(deleteCartProduct)
    .set("Cookie", cookie);
  console.log("deleted", response.body);
  expect(response.statusCode).toEqual(204);
});

test("admin clears a user cart", async () => {
  const response = await request(app).delete("/cart/1");
  expect(response.statusCode).toEqual(204);
});
