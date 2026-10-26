import React from "react";
import styled from "styled-components";

const Feed = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  gap: 1.25rem;
  @media (min-width: 46rem) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
  }
`;

const ProductFeed = ({ children }) => {
  return <Feed>{children}</Feed>;
};

export default ProductFeed;
