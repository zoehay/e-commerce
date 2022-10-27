const express = require("express");
const router = express.Router();
const { prisma } = require("../index");

// router.post("/products", createProduct);

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// router.get("/products/:id", getProductById);

// router.get("/products/search", searchProducts);

// router.put("/products/:id", deleteProduct);

// createProduct = async (req, res) => {
//   const { productName, description, price } = req.body;

//   if (!productName || !description || !price) {
//     return res.status(400).json({
//       error: "All fields required",
//     });
//   }

//   try {
//     const newProduct = await ProductRepository.create(
//       productName,
//       description,
//       price
//     );
//     return res.status(201).send({ newProduct });
//   } catch (error) {
//     return res.status(400).json({
//       error,
//     });
//   }
// };

// getAllProducts = async (req, res) => {
//   try {
//     const products = await ProductRepository.getAllProducts;
//     return res.json({ products });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// searchProducts = async (req, res) => {
//   const query = req.query.search;

//   if (!query) {
//     return res.status(400).json({
//       error: "Name to search required",
//     });
//   }
//   try {
//     const searchResults = await ProductRepository.search(query);
//     return res.json({ searchResults });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// getProductById = async (req, res) => {
//   const { productId } = Number(req.params);

//   if (!productId) {
//     return res.status(400).json({
//       error: "Invalid product id",
//     });
//   }
//   try {
//     const product = await ProductRepository.search(productId);
//     return res.json({ product });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// updateProduct = async (req, res) => {
//   const { productId } = req.params;
//   const { name, description, price } = req.body;
//   try {
//     const product = await ProductRepository.getProduct(productId);
//   } catch (error) {
//     return res.status(400).json({ error });
//   }

//   try {
//     const updatedProduct = await ProductRepository.update(
//       productId,
//       name,
//       description,
//       price
//     );
//     return res.json({ updatedProduct });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// deleteProduct = async (req, res) => {
//   const { productId } = req.params;
// };
