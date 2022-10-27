const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const productData = [
  {
    id: 1,
    name: "Shovel",
    description: "It's like a big spoon for dirt and stuff.",
    price: 9.0,
  },
  {
    id: 2,
    name: "Bug Net",
    description: "Catch those creepy crawlies.",
    price: 11.0,
  },
  {
    id: 2,
    name: "Fishing Rod",
    description: "A rod used for fishing and the like.",
    price: 12.6,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
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
