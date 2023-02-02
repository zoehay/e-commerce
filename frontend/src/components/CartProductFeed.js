import React from "react";
import styled from "styled-components";

const CartFeed = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
`;

const CartProductFeed = ({ children }) => {
  return <CartFeed>{children}</CartFeed>;
};

export default CartProductFeed;
