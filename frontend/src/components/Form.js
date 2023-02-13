import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PageContent from "./PageContent";

export const FormLink = styled(NavLink)`
  font-size: 1rem;
  font-weight: bold;
  color: var(--accent-bold-1);
  &:hover {
    color: var(--accent-bold-2);
  }
`;

export const FormContent = styled(PageContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--accent-bold-1);
  font-size: 1rem;
  font-weight: bold;
`;

export const FormDiv = styled.div`
  width: 100%;
  height: 10rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
