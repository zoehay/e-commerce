const express = require("express");
const { nextTick } = require("process");
const { prisma, cartProductRepository } = require("../repository/repository");
const { checkAuthorization } = require("./auth");

const cartRouter = express.Router();

cartRouter.use(checkAuthorization);

// set cartProduct Quantity to req number
cartRouter.post("/", async (req, res, next) => {
  const userId = req.user.id;
  const productId = Number(req.body.productId);
  // if the req has a quantity, set the cartProduct quantity
  if (req.body.quantity != null) {
    const quantity = Number(req.body.quantity);
    // check if the user has a cartProduct entry for this product
    const foundCartProduct = await cartProductRepository.getCartProductById(
      userId,
      productId
    );
    // if cartProduct is found update the quantity
    if (foundCartProduct != null) {
      if (quantity == 0) {
        // if new quantity is zero, delete the cartProduct
        const deletedCartProduct =
          await cartProductRepository.deleteCartProduct(userId, productId);
        return res.status(204).json({ deletedCartProduct });
      }
      // else just update the quantity
      else {
        const updatedCartProduct =
          await cartProductRepository.updateCartProduct(
            userId,
            productId,
            quantity
          );
        return res.status(200).json({ updatedCartProduct });
      }
    }
    // create a new cartProduct entry for the item if new for user
    const cartProduct = await cartProductRepository.addCartProduct(
      userId,
      productId,
      quantity
    );
    return res.status(201).json({ cartProduct });
  } else {
    // if req has no quantity, use the increment route
    next();
  }
});

// increment cartProduct by one
cartRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const productId = Number(req.body.productId);
  // check if the user has a cartProduct entry for this product
  const foundCartProduct = await cartProductRepository.getCartProductById(
    userId,
    productId
  );
  // if cartProduct is found update the quantity
  if (foundCartProduct != null) {
    const prevQuantity = foundCartProduct.quantity;
    const newQuantity = prevQuantity + 1;
    const updatedCartProduct = await cartProductRepository.updateCartProduct(
      userId,
      productId,
      newQuantity
    );
    return res.status(200).json({ updatedCartProduct });
  }
  // create a new cartProduct entry for the item if new for user
  const cartProduct = await cartProductRepository.addCartProduct(
    userId,
    productId,
    1
  );
  return res.status(201).json({ cartProduct });
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
