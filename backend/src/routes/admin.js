const express = require("express");
const {
  prisma,
  userRepository,
  productRepository,
} = require("../repository/repository");
const bcrypt = require("bcrypt");
const adminRouter = express.Router();
const { checkAuthorization, checkAdmin } = require("./auth");

adminRouter.use(checkAuthorization, checkAdmin);

// User Routes //

adminRouter.post("/users", async (req, res) => {
  const { email, userName, password } = req.body || undefined;
  if (!email || !password) {
    return res.status(400).json({
      error: "email and password fields required",
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userRepository.createUser(
      email,
      userName,
      hashedPassword
    );
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(400).json({
      error: "Create user failed",
    });
  }
});

adminRouter.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  let { email, userName, password } = req.body || undefined;
  if (!email && !userName && !password) {
    return res.status(400).json({
      error: "Need update fields",
    });
  }
  if (password != undefined) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
  }
  try {
    const user = await userRepository.updateUser(id, email, userName, password);
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(400).json({
      error: "Create user failed",
    });
  }
});

adminRouter.get("/users", async (req, res) => {
  const users = await userRepository.getAllUsers();
  return res.status(200).json({ users });
});

adminRouter.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await userRepository.getUserById(id);
  return res.status(200).json({ user });
});

// #TODO: admin user search by email functionality?
adminRouter.get("/search", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "Email term required",
    });
  }
  try {
    const user = await userRepository.getUserByEmail(email);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

adminRouter.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await userRepository.deleteUser(id);
  return res.status(204).json({ user });
});

// Product Routes //

adminRouter.post("/products", async (req, res) => {
  const { productName, description, price } = req.body;
  if (!productName || !description || !price) {
    return res.status(400).json({
      error: "All fields required",
    });
  }
  try {
    const product = await productRepository.createProduct(
      productName,
      description,
      price
    );
    return res.status(201).send({ product });
  } catch (error) {
    return res.status(400).json({
      error: "Create product failed",
    });
  }
});

adminRouter.put("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const productName = req.body.productName || undefined;
  const description = req.body.description || undefined;
  const price = req.body.price || undefined;
  if (!id) {
    return res.status(400).json({
      error: "Product id required for update",
    });
  }
  try {
    const product = await productRepository.updateProduct(
      id,
      productName,
      description,
      price
    );
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

adminRouter.delete("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await productRepository.deleteProduct(id);
    return res.status(204).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = adminRouter;
