const { Prisma, PrismaClient } = require("@prisma/client");
const ProductRepository = require("./ProductRepository");

const prisma = new PrismaClient();

const productRepository = new ProductRepository(prisma);

module.exports = { prisma, productRepository };

// export class UserRepository {
//   registerUser(name, email, password) {
//     user;
//   }
//   getUserById(userId) {
//     user;
//   }
//   updateUser(userId, name, email, password) {
//     bool;
//   }
//   deleteUser(userId) {
//     bool;
//   }
//   getUserByEmail(email) {
//     user;
//   }
// }

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
