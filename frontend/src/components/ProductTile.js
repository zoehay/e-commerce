import React, { useContext, useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Tile = styled.div`
  background: papayawhip;
  min-width: 8rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.p`
  font-size: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 0.875rem;
`;

const ProductDescription = styled.p`
  font-size: 0.75rem;
`;

const AddToCart = styled.button`
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: lightcoral;
  &:hover {
    background-color: lightcyan;
  }
`;

const ProductTile = ({ product }) => {
  const context = useContext(UserContext);
  const user = context.user;

  return (
    <Tile>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>

        <AddToCart
          type="button"
          onClick={() => {
            console.log(user.id, product.id);
            Client.addCartProduct(user.id, product.id);
          }}
        >
          Add to Cart
        </AddToCart>
      </ProductInfo>
    </Tile>
  );
};

export default ProductTile;
