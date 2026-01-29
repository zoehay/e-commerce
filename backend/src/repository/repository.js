const { PrismaClient } = require("@prisma/client");
const ProductRepository = require("./ProductRepository");
const UserRepository = require("./UserRepository");
const CartProductRepository = require("./CartProductRepository");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const productRepository = new ProductRepository(prisma);
const userRepository = new UserRepository(prisma);
const cartProductRepository = new CartProductRepository(prisma);

module.exports = {
  prisma,
  productRepository,
  userRepository,
  cartProductRepository,
};
