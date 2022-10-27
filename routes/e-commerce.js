const express = require("express");
const {
  createProduct,
  getAllProducts,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");

const router = express.Router();

router.post("/product", createProduct);

router.get("/products", getAllProducts);

router.get("/product", searchProducts);

router.get("/product/:id", getProductById);

router.put("/product/:id");
