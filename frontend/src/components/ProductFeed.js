import React from "react";
import styled from "styled-components";

const Feed = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ProductFeed = ({ children }) => {
  return <Feed>{children}</Feed>;
};

export default ProductFeed;
