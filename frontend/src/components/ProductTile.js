import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  background: papayawhip;
  border: solid;
  padding: 2em;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.p`
  font-size: 2em;
`;

const ProductPrice = styled.p`
  font-size: 1em;
`;

const ProductDescription = styled.p`
  font-size: 1em;
`;

const ProductTile = ({ product }) => {
  return (
    <Tile>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductInfo>
    </Tile>
  );
};

export default ProductTile;
