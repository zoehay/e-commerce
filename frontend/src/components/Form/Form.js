import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PageContent from "../Content/PageContent";

// the link to other page on a form page
export const FormLink = styled(NavLink)`
  font-size: 1rem;
  font-weight: bold;
  color: var(--accent-bold-1);
  &:hover {
    color: var(--accent-bold-2);
  }
`;

// format info on form page
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
  height: 12rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: normal;
  font-size: 1rem;
`;

export const FormField = styled.div`
  margin: 0.5rem;
`;
