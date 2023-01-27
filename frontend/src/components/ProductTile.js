import React, { useContext, useState } from "react";
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

const ProductTile = ({ product }) => {
  const context = useContext(UserContext);
  const user = context.user;

  const [quantity, setQuantity] = useState(1);

  return (
    <Tile>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        <>
          <label htmlFor="quantityInput">Quantity</label>
          <input
            id="quantityInput"
            name="quantity"
            type="number"
            defaultValue={1}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </>
        <AddToCart
          onClick={() => {
            console.log(user.id, product.id, quantity);
            Client.addCartProduct(user.id, product.id, quantity);
          }}
        >
          Add to Cart
        </AddToCart>
      </ProductInfo>
    </Tile>
  );
};

export default ProductTile;
