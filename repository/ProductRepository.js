class ProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createProduct(productName, description, price) {
    return this.prisma.product.create({
      data: {
        name: productName,
        description: description,
        price: price,
      },
    });
  }

  getAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id) {
    return this.prisma.product.findUnique({
      where: { id: id },
    });
  }

  // update(productId, name, description, price) {}

  deleteProduct(id) {
    return this.prisma.product.delete({
      where: { id: id },
    });
  }
}

module.exports = ProductRepository;
