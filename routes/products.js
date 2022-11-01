const express = require("express");
const { prisma, productRepository } = require("../repository/repository");

const router = express.Router();

router.post("/", async (req, res) => {
  const { productName, description, price } = req.body;
  console.log("post");
  console.log(productName, description, price);
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

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await productRepository.getProductById(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await productRepository.deleteProduct(id);
    return res.status(204);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

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
