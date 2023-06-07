import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Client from "../../util/Client";
import { UserContext } from "../../util/userContext";

const Tile = styled.div`
  background: var(--bg-color-1);
  min-width: 8rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0.5rem 0.5rem 0.7rem var(--accent-light-1);
  border-radius: 0.25rem;
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
  background-color: var(--accent-light-2);
  &:hover {
    background-color: var(--accent-bold-2);
  }
`;

const LoginLink = styled(NavLink)`
  color: var(--accent-bold-1);
  display: flex;
  text-decoration: none;
  font-size: 0.65rem;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: var(--accent-light-2);
  width: 60%;
  max-width: 10rem;
  margin: 0rem auto;
  &:hover {
    color: var(--accent-bold-2);
  }
`;

const ProductTile = ({ product }) => {
  const context = useContext(UserContext);
  const user = context.user;

  return (
    <Tile data-testid={`tile-product-${product.id}`}>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        {user != undefined ? (
          <AddToCart
            type="button"
            data-testid={`add-product-${product.id}`}
            onClick={() => {
              if (user) {
                Client.incrementCartProductQuantity(user.id, product.id);
              } else {
                alert("no user");
              }
            }}
          >
            Add to Cart
          </AddToCart>
        ) : (
          <LoginLink to="/auth/login" data-testid="login-from-tile">
            Login to Add
          </LoginLink>
        )}
      </ProductInfo>
    </Tile>
  );
};

export default ProductTile;
