import React from "react";
import styled from "styled-components";

const Feed = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  column-gap: 1rem;
  @media (min-width: 46rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ProductFeed = ({ children }) => {
  return <Feed>{children}</Feed>;
};

export default ProductFeed;
