import React, { useContext, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../util/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faRightFromBracket,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { MobileNavExt } from "./MobileNav";

const Nav = styled.nav`
  height: 5rem;
  display: flex;
  margin-bottom: 1rem;
`;

const NavBackground = styled.div`
  background-color: var(--accent-bold-1);
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NavMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 46rem) {
    max-width: 75rem;
    justify-content: space-between;
  }
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
  width: min-content;

  box-sizing: border-box;
`;

const MobileNavDiv = styled(NavDiv)`
  display: grid;
  justify-content: left;
  @media (min-width: 46rem) {
    display: flex;
    align-items: center;
  }
`;

export const NavSelect = styled(NavLink)`
  color: #f4f1bb;
  display: flex;
  align-items: center;
  margin: 0 0.25rem;
  text-decoration: none;
  font-size: 1rem;
  width: 2rem;
  justify-content: center;
  box-sizing: border-box;
  &:hover {
    color: #ed6a5a;
  }
  @media (min-width: 46rem) {
    margin: 0 1rem;
  }
`;

export const NavButton = styled.button`
  color: var(--accent-light-2);
  background-color: transparent;
  border: none;
  width: 2rem;
  margin: 0 0.25rem;
  &:hover {
    color: var(--accent-bold-2);
  }
  @media (min-width: 46rem) {
    margin: 0 1rem;
  }
`;

const NavLogo = styled(NavSelect)`
  font-size: 2rem;
  padding: 0;
  width: fit-content;
  @media (min-width: 46rem) {
    display: flex;
    align-items: center;
  }
`;

const UserOptions = () => {
  const context = useContext(UserContext);
  const user = context.user;
  const navigate = useNavigate();

  if (!user) {
    return (
      <NavDiv>
        <NavSelect to="/auth/login">
          <FontAwesomeIcon icon={faUser} />
        </NavSelect>
        <NavSelect to="/auth/register">Register</NavSelect>
      </NavDiv>
    );
  } else {
    return (
      <NavDiv>
        <NavSelect to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </NavSelect>
        <NavSelect to="/user">
          <FontAwesomeIcon icon={faUser} />
        </NavSelect>
        <NavButton
          onClick={() => {
            context.logout();
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </NavButton>
      </NavDiv>
    );
  }
};

export const Navbar = () => {
  return (
    <Nav>
      <NavBackground>
        <NavMenu>
          <MobileNavDiv>
            <MobileNavExt></MobileNavExt>
          </MobileNavDiv>
          <NavLogo to="/">The Store</NavLogo>
          <UserOptions></UserOptions>
        </NavMenu>
      </NavBackground>
    </Nav>
  );
};

export default Navbar;
