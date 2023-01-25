import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

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

const AddToCart = styled.button`
  font-size: 1em;
  border-radius: 8px;
  background-color: lightcoral;
  &:hover {
    background-color: lightcyan;
  }
`;

const CartProductTile = ({ product }) => {
  const context = useContext(UserContext);
  const user = context.user;

  let [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      const productDetails = await Client.getProductById(product.productId);
      console.log("getting tile", productDetails);
      setProductDetails(productDetails);
    }
    fetchDetails();
  }, []);

  return (
    <Tile>
      <ProductInfo>
        <ProductName>{product.productId}</ProductName>
        <ProductPrice>{productDetails.name}</ProductPrice>
        <ProductDescription></ProductDescription>
      </ProductInfo>
    </Tile>
  );
};

export default CartProductTile;
