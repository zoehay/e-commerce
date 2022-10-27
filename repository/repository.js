const pool = require("./database");

const PRODUCTS = [
  {
    productId: 1,
    name: "Soap",
    description: "Cleans stuff",
    price: 3.99,
  },
];

export class ProductRepository {
  create(productId, name, description, price) {
    return product;
  }

  getAllProducts() {
    return PRODUCTS;
  }

  search(name) {
    return products;
  }

  getProduct(productId) {
    return product;
  }

  update(productId, name, description, price) {}

  delete(productId) {}
}

export class UserRepository {
  registerUser(name, email, password) {
    user;
  }
  getUserById(userId) {
    user;
  }
  updateUser(userId, name, email, password) {
    bool;
  }
  deleteUser(userId) {
    bool;
  }
  getUserByEmail(email) {
    user;
  }
}

export class CartRepository {
  addProduct(userId, productId, quantity) {
    cart;
  }
  removeProduct(userId, productId) {
    cart;
  }
  getCart(userId) {
    cart;
  }
  clearCart(userId) {
    bool;
  }
}

export class OrderRepository {
  createOrder(userId, products) {
    order;
  }
  getOrdersByUserId(userId) {
    order;
  }
  getOrderByOrderId(orderId) {
    order;
  }
}
