const { PrismaClient, Prisma } = require("@prisma/client");
const request = require("supertest");
const app = require("../src/app");

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  console.log("Seed");

  let checkForProducts = await prisma.product.findMany();
  console.log(`${checkForProducts.length} product entries found`);
  if (checkForProducts.length > 0) {
    console.log("Products already seeded");
    return;
  }

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
      email: "john@email.com",
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
      password: "plant",
    },
  ];
  await Promise.all(
    users.map(async (user) => {
      const response = await request(app).post("/auth/register").send(user);
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
