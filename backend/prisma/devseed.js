const { PrismaClient, Prisma } = require("@prisma/client");
const request = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  console.log("Seed");

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Session" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartProduct";`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" CASCADE;`);

  let products = [
    {
      name: "Shovel",
      description: "It's like a big spoon for dirt and stuff.",
      price: 9.0,
    },
    {
      name: "Bug Net",
      description: "Catch those creepy crawlies.",
      price: 11.0,
    },
    {
      name: "Fishing Rod",
      description: "A rod used for fishing and the like.",
      price: 12.6,
    },
    {
      name: "BBQ",
      description: "Throw some stuff on this. It will then cook..",
      price: 340.0,
    },
    {
      name: "Basic Axe",
      description: "Chop down trees and plants..",
      price: 10.0,
    },
    {
      name: "Bananas",
      description: "Squishy",
      price: 4.96,
    },
    {
      name: "Bush Lime",
      description: "Sour but yummy.",
      price: 1.8,
    },
    {
      name: "Torch",
      description: "This isn't a flashlight... its a torch!",
      price: 60.0,
    },
    {
      name: "Wheelbarrow",
      description: "Fill it with dirt or other stuff.",
      price: 300.0,
    },
    {
      name: "Table Saw",
      description: "Can cut wood into planks.",
      price: 52.0,
    },
  ];

  await Promise.all(
    products.map(async (product) => {
      await prisma.product.create({
        data: product,
      });
    })
  );

  let users = [
    {
      email: "john@email",
      userName: "John",
      password: "stuff",
    },
    {
      email: "fletch@email.com",
      userName: "Fletch",
      password: "lime",
    },
    {
      email: "ray@email.com",
      userName: "",
      password: "plant",
    },
  ];

  for (const user of users) {
    console.log(user);
    const salt = await bcrypt.genSalt(10);
    const hashedUserPassword = await bcrypt.hash(user.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.userName,
        password: hashedUserPassword,
      },
    });
    console.log(newUser);
  }

  let cartProducts = [
    {
      userId: 1,
      productId: 1,
      quantity: 1,
    },
    {
      userId: 1,
      productId: 2,
      quantity: 1,
    },
    {
      userId: 1,
      productId: 3,
      quantity: 2,
    },
    {
      userId: 2,
      productId: 1,
      quantity: 3,
    },
    {
      userId: 3,
      productId: 3,
      quantity: 2,
    },
  ];

  await Promise.all(
    cartProducts.map(async (cartProduct) => {
      await prisma.cartProduct.create({ data: cartProduct });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
