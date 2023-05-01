const express = require("express");
const { prisma, cartProductRepository } = require("../repository/repository");
const { checkAuthorization } = require("./auth");

const cartRouter = express.Router();

cartRouter.use(checkAuthorization);

// update a cartProduct quantity
cartRouter.post("/", async (req, res, next) => {
  const userId = req.user.id;
  const productId = Number(req.body.productId);

  if (!req.body.hasOwnProperty("quantity")) {
    return next();
  }

  const quantity = Number(req.body.quantity);
  if (quantity === 1) {
    return next();
  }

  try {
    if (quantity === 0) {
      const deletedCartProduct = await cartProductRepository.deleteCartProduct(
        userId,
        productId
      );
      return res.status(200).json({ deletedCartProduct });
    } else {
      const updatedCartProduct = await cartProductRepository.updateCartProduct(
        userId,
        productId,
        quantity
      );
      return res.status(200).json({ updatedCartProduct });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const incrementQuantity = async (existingCartProduct) => {
  const prevQuantity = existingCartProduct.quantity;
  const newQuantity = prevQuantity + 1;
  try {
    const updatedCartProduct = await cartProductRepository.updateCartProduct(
      existingCartProduct.userId,
      existingCartProduct.productId,
      newQuantity
    );
    return updatedCartProduct;
  } catch (error) {
    return error;
  }
};

// add a new cartProduct or increment if existing
cartRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const productId = Number(req.body.productId);

  try {
    const existingCartProduct = await cartProductRepository.getCartProductById(
      userId,
      productId
    );

    if (existingCartProduct?.productId) {
      const updatedCartProduct = await incrementQuantity(existingCartProduct);
      return res.status(200).json({ updatedCartProduct });
    } else {
      const newCartProduct = await cartProductRepository.addCartProduct(
        userId,
        productId,
        1
      );
      return res.status(201).json({ newCartProduct });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get cartProducts by user id
cartRouter.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await cartProductRepository.getUserCart(userId);
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get details for all cartProducts in a user's cart
cartRouter.get("/details", async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await cartProductRepository.getUserCartDetails(userId);
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// clear a user's cart
cartRouter.delete("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedCartProducts = await cartProductRepository.clearUserCart(
      userId
    );
    return res.status(204).json({ deletedCartProducts });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = cartRouter;
