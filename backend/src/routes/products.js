const express = require("express");
const { prisma, productRepository } = require("../repository/repository");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productRepository.getAllProducts();
  return res.json({ products });
});

router.get("/search/", async (req, res) => {
  const searchName = req.query.searchName;
  if (!searchName) {
    return res.status(400).json({
      error: "Name search term required",
    });
  }
  try {
    const products = await productRepository.getProductsBySearchName(
      searchName
    );
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await productRepository.getProductById(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
