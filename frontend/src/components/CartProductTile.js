import React, { useContext, useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Tile = styled.div`
  background: papayawhip;
  border: solid;
  padding: 1em;
  margin: 1em;
`;

const ProductInfo = styled.div`
  justify-content: left;
  align-items: center;
`;

const ProductName = styled.p`
  font-size: 1em;
`;

const ProductPrice = styled.p`
  font-size: 0.75em;
  margin: 0.25em;
`;

const ProductDescription = styled.p`
  font-size: 1em;
  margin: 0.25em;
`;

const ProductQuantity = styled.p`
  font-size: 1em;
  margin: 0.25em;
`;

const AddToCart = styled.button`
  font-size: 1em;
  border-radius: 8px;
  background-color: lightcoral;
  &:hover {
    background-color: lightcyan;
  }
`;

// const QuantitySelector = () => {
//     return (
//         <div>
//             <a><input class=""/></a>
//         </div>
//     )
// }

const CartProductTile = ({ product, onChange }) => {
  const context = useContext(UserContext);
  const user = context.user;

  const handleChange = async (event) => {
    event.preventDefault();
    await Client.updateCartProductQuantity(
      Number(user.id),
      product.productId,
      event.target.value
    );
    await onChange();
  };

  return (
    <Tile>
      <ProductName>{product.product.name}</ProductName>
      <ProductInfo>
        <ProductPrice>{product.product.price}g</ProductPrice>
        <ProductDescription>{product.product.description}</ProductDescription>
        <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
        <>
          <label htmlFor="quantityInput">Quantity</label>
          <input
            id="quantityInput"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
          />
        </>
      </ProductInfo>
    </Tile>
  );
};

export default CartProductTile;
