const express = require("express");
const { prisma, productRepository } = require("../repository/repository");

const router = express.Router();

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  console.log("delete");
  const id = Number(req.params.id);
  console.log(id);
  try {
    const product = await productRepository.deleteProduct(id);
    return res.status(204).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
