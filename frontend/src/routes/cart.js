import { useEffect, useState } from "react";
import styled from "styled-components";
import CartProductFeed from "../components/CartProductFeed";
import CartProductTile from "../components/CartProductTile";
import Client from "../util/Client";

const CartTotal = styled.p`
  background-color: lightblue;
  border: solid;
  font-size: 1em;
  padding: 1em;
  margin: 1em;
`;

const Cart = () => {
  let [cartProducts, setCartProducts] = useState([]);
  let [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let cart = await Client.getCartDetails();
      setCartProducts(cart);
      console.log("set cart", cart);
    }
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

  let cartProductTiles = cartProducts.map((product, index) => (
    <CartProductTile product={product} key={index} />
  ));

  return (
    <div>
      <CartProductFeed>{cartProductTiles}</CartProductFeed>
      <CartTotal>Cart Total: {cartTotal}</CartTotal>
    </div>
  );
};

export default Cart;
