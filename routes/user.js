const express = require("express");
const { prisma, userRepository } = require("../repository/repository");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { checkAuthorization } = require("./auth");

userRouter.use(checkAuthorization);

userRouter.post("/admin", async (req, res) => {
  const { email, userName, password } = req.body;
  if (!email || !userName || !password) {
    return res.status(400).json({
      error: "All fields required",
    });
  }
  try {
    const user = await userRepository.createUser(email, userName, password);
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(400).json({
      error: "Create user failed",
    });
  }
});

userRouter.get("/admin", async (req, res) => {
  const users = await userRepository.getAllUsers();
  return res.json({ users });
});

userRouter.get("/admin/search/", async (req, res) => {
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

userRouter.get("/", async (req, res) => {
  const id = req.user.id;
  try {
    const user = await userRepository.getUserById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRouter.put("/", async (req, res) => {
  console.log("put route");
  let id = req.user.id;
  let email = req.body.email || undefined;
  let userName = req.body.userName || undefined;
  let password = req.body.password || undefined;
  console.log(id, email, userName, password);
  try {
    if (password != undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;
    }
    const user = await userRepository.updateUser(id, email, userName, password);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRouter.delete("/", async (req, res) => {
  const id = req.user.id;
  console.log(id);
  try {
    const user = await userRepository.deleteUser(id);
    return res.status(204).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = userRouter;
