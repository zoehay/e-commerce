const express = require("express");
const { prisma, userRepository } = require("../src/repository/repository");
const bcrypt = require("bcrypt");

const email = "admin";
const userName = "admin";
const password = "secret";

async function main() {
  console.log("create-admin");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userRepository.createAdminUser(
      email,
      userName,
      hashedPassword,
      true
    );
  } catch (e) {
    console.log(e);
  }
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

module.exports = { email, userName, password };
