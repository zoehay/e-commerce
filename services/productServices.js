const {
  ProductRepository,
  UserRepository,
  CartRepository,
  OrderRepository,
} = require("../repository/repository");

exports.createProduct = async (req, res) => {
  const { productName, description, price } = req.body;

  if (!productName || !description || !price) {
    return res.status(400).json({
      error: "All fields required",
    });
  }

  try {
    const newProduct = await ProductRepository.create(
      productName,
      description,
      price
    );
    return res.status(201).send({ newProduct });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductRepository.getAllProducts;
    return res.json({ products });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.searchProducts = async (req, res) => {
  const query = req.query.search;

  if (!query) {
    return res.status(400).json({
      error: "Name to search required",
    });
  }
  try {
    const searchResults = await ProductRepository.search(query);
    return res.json({ searchResults });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = Number(req.params);

  if (!productId) {
    return res.status(400).json({
      error: "Invalid product id",
    });
  }
  try {
    const product = await ProductRepository.search(productId);
    return res.json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await ProductRepository.getProduct(productId);
  } catch (error) {
    return res.status(400).json({ error });
  }

  try {
    const updatedProduct = await ProductRepository.update(
      productId,
      name,
      description,
      price
    );
    return res.json({ updatedProduct });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
};
