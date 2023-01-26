import React from "react";
import styled from "styled-components";

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

const CartProductTile = ({ product }) => {
  return (
    <Tile>
      <ProductName>{product.product.name}</ProductName>
      <ProductInfo>
        <ProductPrice>{product.product.price}g</ProductPrice>
        <ProductDescription>{product.product.description}</ProductDescription>
        <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
      </ProductInfo>
    </Tile>
  );
};

export default CartProductTile;
