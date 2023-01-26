const { PrismaClient, Prisma } = require("@prisma/client");
const request = require("supertest");
const { getModeForUsageLocation } = require("typescript");
const app = require("../src/app");

const prisma = new PrismaClient({ log: ["query"] });

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

let users = [
  {
    email: "john@goods.com",
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

let cartProducts = [
  {
    userId: 1,
    productId: 1,
    quantity: 1,
  },
  {
    userId: 1,
    productId: 2,
    quantity: 2,
  },
];

module.exports = { products, users, cartProducts };
