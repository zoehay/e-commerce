import { useContext, useEffect, useState } from "react";
import CartProductFeed from "../components/CartProductFeed";
import CartProductTile from "../components/CartProductTile";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Cart = () => {
  let [cartProducts, setCartProducts] = useState([]);

  const context = useContext(UserContext);
  const user = context.user;

  useEffect(() => {
    async function fetchData() {
      let cart = await Client.getCartProducts();
      setCartProducts(cart);
      console.log("set cart", cartProducts);
    }
    fetchData();
  }, []);

  let cartProductTiles = cartProducts.map((product, index) => (
    <CartProductTile product={product} key={index} />
  ));

  return (
    <div>
      {cartProducts ? (
        <>
          <CartProductFeed>{cartProductTiles}</CartProductFeed>
        </>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default Cart;
