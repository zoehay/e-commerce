class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser(email, userName, password) {
    return this.prisma.user.create({
      data: {
        email: email,
        name: userName,
        password: password,
        isAdmin: false,
      },
    });
  }

  createAdminUser(email, userName, password) {
    return this.prisma.user.create({
      data: {
        email: email,
        name: userName,
        password: password,
        isAdmin: true,
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserByEmail(email) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  getUserById(id) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  updateUser(userId, email, userName, password) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { email: email, name: userName, password: password },
    });
  }

  deleteUser(id) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}

module.exports = UserRepository;
