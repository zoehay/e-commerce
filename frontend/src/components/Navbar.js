import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: lightblue;
  height: 85px;
  display: flex;
  margin-bottom: 2rem;
`;

const NavMenu = styled.div`
  background-color: lightcoral;
  display: flex;
`;

const NavSelect = styled(NavLink)`
  color: aquamarine;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  &:hover {
    color: black;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavMenu>
        <NavSelect to="/products">Products</NavSelect>
        <NavSelect to="/auth/login">Login</NavSelect>
        <NavSelect to="/auth/register">Register</NavSelect>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
