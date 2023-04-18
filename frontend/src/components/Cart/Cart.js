import { useEffect, useState } from "react";
import styled from "styled-components";
import CartProductFeed from "./CartProductFeed";
import CartProductTile from "./CartProductTile";
import MainContent from "../Content/MainContent";
import PageContent from "../Content/PageContent";
import Client from "../../util/Client";

const CartTotal = styled.p`
  background-color: var(--accent-bold-1);
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Cart = () => {
  let [cartProducts, setCartProducts] = useState([]);
  let [cartTotal, setCartTotal] = useState(0);

  async function fetchData() {
    let cart = await Client.getCartDetails();
    setCartProducts(cart);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let cartTotal = 0;
    for (const item of cartProducts) {
      const quantity = item.quantity;
      const price = item.product.price;
      const itemTotal = quantity * price;
      cartTotal += itemTotal;
    }
    setCartTotal(cartTotal);
  }, [cartProducts]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const newCartProducts = cartProducts.map((product) => {
      if (product.productId === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      } else {
        return product;
      }
    });
    setCartProducts(newCartProducts);
  };

  let cartProductTiles = cartProducts.map((product, index) => (
    <CartProductTile
      product={product}
      key={index}
      onChange={handleUpdateQuantity}
    />
  ));

  return (
    <MainContent>
      {" "}
      <PageContent>
        {cartProductTiles ? (
          <CartProductFeed>{cartProductTiles}</CartProductFeed>
        ) : (
          <h2> Loading </h2>
        )}

        <CartTotal>Cart Total: {cartTotal}</CartTotal>
      </PageContent>
    </MainContent>
  );
};

export default Cart;
