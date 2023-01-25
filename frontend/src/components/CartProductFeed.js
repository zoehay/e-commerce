import React from "react";
import styled from "styled-components";

const Feed = styled.div`
  display: block;
`;

const CartProductFeed = ({ children }) => {
  return <Feed>{children}</Feed>;
};

export default CartProductFeed;
