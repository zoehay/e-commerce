const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
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
  // let users = [
  //   {
  //     email: 'fletch@email.com',
  //     name: "Fletch",
  //     password: 'heyitsatestpassword'
  //   }
  // ]
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
