class CartProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getCartProductById(userId, productId) {
    return this.prisma.cartProduct.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  }

  addCartProduct(userId, productId, quantity) {
    return this.prisma.cartProduct.create({
      data: { userId: userId, productId: productId, quantity: quantity },
    });
  }

  deleteCartProduct(userId, productId) {
    return this.prisma.cartProduct.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      select: {
        userId: true,
        productId: true,
        quantity: true,
      },
    });
  }

  updateCartProduct(userId, productId, quantity) {
    return this.prisma.cartProduct.update({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      data: { quantity },
    });
  }

  getUserCart(userId) {
    return this.prisma.cartProduct.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getUserCartDetails(userId) {
    return this.prisma.cartProduct.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        productId: "desc",
      },
    });
  }

  clearUserCart(userId) {
    return this.prisma.cartProduct.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}

module.exports = CartProductRepository;
