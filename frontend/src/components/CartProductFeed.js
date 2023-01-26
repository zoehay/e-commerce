import React from "react";
import styled from "styled-components";

const CartFeed = styled.div`
  display: block;
`;

const CartProductFeed = ({ children }) => {
  return <CartFeed>{children}</CartFeed>;
};

export default CartProductFeed;
