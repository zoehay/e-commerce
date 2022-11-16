const express = require("express");
const { prisma, cartProductRepository } = require("../repository/repository");
const { checkUserId } = require("./auth");

const cartRouter = express.Router();

// add or decrement quantity of a cartProduct
cartRouter.post("/:id", checkUserId, async (req, res) => {
  const userId = Number(req.body.userId);
  const productId = Number(req.body.productId);
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
      const deletedCartProduct = await cartProductRepository.deleteCartProduct(
        userId,
        productId
      );
      return res.status(204).json({ deletedCartProduct });
    }
    // else just update the quantity
    const updatedCartProduct = await cartProductRepository.updateCartProduct(
      userId,
      productId,
      quantity
    );
    return res.status(200).json({ updatedCartProduct });
  }
  // create a new cartProduct entry for the item if new for user
  const cartProduct = await cartProductRepository.addCartProduct(
    userId,
    productId,
    quantity
  );
  return res.status(201).json({ cartProduct });
});

// get all cartProduct items in a user's cart
cartRouter.get("/:id", checkUserId, async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const cart = await cartProductRepository.getUserCart(userId);
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// clear a user's cart
cartRouter.delete("/:id", checkUserId, async (req, res) => {
  console.log("delete");
  const userId = Number(req.params.id);
  console.log(userId);
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
