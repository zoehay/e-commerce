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
    return this.prisma.product.findUniqueOrThrow({
      where: { id: id },
    });
  }

  getProductsBySearchName(searchName) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
      },
    });
  }

  updateProduct(productId, productName, description, price) {
    return this.prisma.product.update({
      where: { id: productId },
      data: { name: productName, description: description, price: price },
    });
  }

  deleteProduct(id) {
    return this.prisma.product.delete({
      where: { id: id },
    });
  }
}

module.exports = ProductRepository;
