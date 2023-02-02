import React, { useContext, useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Tile = styled.div`
  box-sizing: border-box;
  background: papayawhip;
  border: solid;
  padding: 1rem;
  display: grid;
  margin-bottom: 1rem;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  @media (min-width: 46rem) {
    grid-template-columns: 0.75fr 1.25fr 1fr;
  }
`;

const ProductInfo = styled.div`
  justify-content: left;
  align-items: center;
`;

const ProductName = styled.p`
  font-size: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 0.75rem;
  margin: 0.25rem;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  margin: 0.25rem;
  display: none;
  @media (min-width: 46rem) {
    display: contents;
  }
`;

const ProductQuantity = styled.p`
  font-size: 1rem;
  margin: 0.25rem;
`;

const SetQuantity = styled.div`
  font-size: 1rem;
`;

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
      </ProductInfo>
      <SetQuantity>
        <label htmlFor="quantityInput">Quantity</label>
        <input
          id="quantityInput"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
        />
      </SetQuantity>
    </Tile>
  );
};

export default CartProductTile;
