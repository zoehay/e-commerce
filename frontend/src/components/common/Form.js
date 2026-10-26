import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PageContent from "./PageContent";

// the link to other page on a form page
export const FormLink = styled(NavLink)`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-bold-1);
  text-decoration: none;
  transition: color var(--transition-fast);
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
  max-width: 26rem;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
`;

export const FormDiv = styled.div`
  width: 100%;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-weight: normal;
  font-size: 1rem;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const FormField = styled.div`
  margin: 0.6rem 0;
  display: flex;
  flex-direction: column;

  input[type="submit"] {
    margin-top: 0.5rem;
    align-self: center;
  }
`;
