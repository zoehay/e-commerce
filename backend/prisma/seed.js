const { PrismaClient, Prisma } = require("@prisma/client");
const request = require("supertest");
const app = require("../src/app");

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  console.log("Seed");
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
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
