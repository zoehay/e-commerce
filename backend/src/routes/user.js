const express = require("express");
const { prisma, userRepository } = require("../repository/repository");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { checkAuthorization } = require("./auth");

userRouter.use(checkAuthorization);

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
  let id = req.user.id;
  let email = req.body.email || undefined;
  let userName = req.body.userName || undefined;
  let password = req.body.password || undefined;
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
  try {
    const user = await userRepository.deleteUser(id);
    return res.status(204).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = userRouter;
