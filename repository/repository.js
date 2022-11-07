const { PrismaClient } = require("@prisma/client");
const ProductRepository = require("./ProductRepository");
const UserRepository = require("./UserRepository");

const prisma = new PrismaClient();

const productRepository = new ProductRepository(prisma);
const userRepository = new UserRepository(prisma);

module.exports = { prisma, productRepository, userRepository };

// export class CartRepository {
//   addProduct(userId, productId, quantity) {
//     cart;
//   }
//   removeProduct(userId, productId) {
//     cart;
//   }
//   getCart(userId) {
//     cart;
//   }
//   clearCart(userId) {
//     bool;
//   }
// }

// export class OrderRepository {
//   createOrder(userId, products) {
//     order;
//   }
//   getOrdersByUserId(userId) {
//     order;
//   }
//   getOrderByOrderId(orderId) {
//     order;
//   }
// }
