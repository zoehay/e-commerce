import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  background-color: var(--accent-light-3);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-fast), transform var(--transition-fast),
    box-shadow var(--transition-fast);
  &:hover {
    background-color: var(--accent-bold-2);
    color: #fff;
    transform: translateY(-0.1rem);
    box-shadow: var(--shadow-md);
  }
`;
