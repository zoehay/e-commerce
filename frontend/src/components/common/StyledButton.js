import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  border: none;
  background-color: var(--accent-light-3);
  box-shadow: 0rem 0.3rem 0.6rem 0rem var(--accent-light-1),
    0rem 0.2rem 0.7rem 0rem var(--accent-light-1);
  &:hover {
    background-color: var(--accent-bold-2);
  }
`;
