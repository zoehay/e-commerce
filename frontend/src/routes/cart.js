import { useEffect, useState } from "react";
import styled from "styled-components";
import CartProductFeed from "../components/CartProductFeed";
import CartProductTile from "../components/CartProductTile";
import MainContent from "../components/MainContent";
import PageContent from "../components/PageContent";
import Client from "../util/Client";

const CartTotal = styled.p`
  background-color: lightblue;
  border: solid;
  font-size: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 100%;
`;

const Cart = () => {
  let [cartProducts, setCartProducts] = useState([]);
  let [cartTotal, setCartTotal] = useState(0);

  async function fetchData() {
    let cart = await Client.getCartDetails();
    setCartProducts(cart);
    console.log("set cart", cart);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let cartTotal = 0;
    console.log("calculate total");
    for (const item of cartProducts) {
      const quantity = item.quantity;
      const price = item.product.price;
      console.log(price, quantity);
      const itemTotal = quantity * price;
      cartTotal += itemTotal;
    }
    setCartTotal(cartTotal);
  }, [cartProducts]);

  const handleChange = async () => {
    console.log("handlechange");
    await fetchData();
  };

  let cartProductTiles = cartProducts.map((product, index) => (
    <CartProductTile product={product} key={index} onChange={handleChange} />
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
