import { useEffect, useState } from "react";
import styled from "styled-components";
import CartProductFeed from "./CartProductFeed";
import CartProductTile from "./CartProductTile";
import MainContent from "../Content/MainContent";
import PageContent from "../Content/PageContent";
import Client from "../../util/Client";
import { StyledButton } from "../common/StyledButton";

const CartTotal = styled.div`
  background-color: var(--accent-bold-1);
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const Cart = () => {
  let [cartProducts, setCartProducts] = useState([]);
  let [cartTotal, setCartTotal] = useState(0);
  let [cartProductCount, setCartProductCount] = useState(0);

  async function fetchData() {
    let cart = await Client.getCartDetails();
    setCartProducts(cart);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let cartTotal = 0;
    let countTotal = 0;
    for (const item of cartProducts) {
      const quantity = item.quantity;
      const price = item.product.price;
      let itemTotal = quantity * price;
      cartTotal += itemTotal;
      countTotal++;
    }
    setCartTotal(cartTotal.toFixed(2));
    setCartProductCount(countTotal);
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

  const handleClearCart = async () => {
    let deletedCount = await Client.clearCart();
    if (Number(deletedCount) == cartProductCount) {
      setCartProducts([]);
    }
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
        <h2 data-testid="page-name">My Shopping Cart</h2>
        {cartProductTiles ? (
          <CartProductFeed>{cartProductTiles}</CartProductFeed>
        ) : (
          <h2> Loading </h2>
        )}

        <CartTotal>
          Cart Total <div data-testid="cart-total">{cartTotal}</div>
        </CartTotal>
        <StyledButton onClick={handleClearCart}>Clear Cart</StyledButton>
      </PageContent>
    </MainContent>
  );
};

export default Cart;
