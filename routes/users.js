const express = require("express");
const { prisma, userRepository } = require("../repository/repository");

const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  const users = await userRepository.getAllUsers();
  return res.json({ users });
});

router.get("/search/", async (req, res) => {
  const email = req.query.email;
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

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await userRepository.getUserById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const email = req.body.email || undefined;
  const userName = req.body.userName || undefined;
  const password = req.body.password || undefined;
  if (!id) {
    return res.status(400).json({
      error: "User id required for update",
    });
  }
  try {
    const user = await userRepository.updateUser(id, email, userName, password);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete");
  const id = Number(req.params.id);
  console.log(id);
  try {
    const user = await userRepository.deleteUser(id);
    return res.status(204).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
