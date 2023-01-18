import React from "react";
import styled from "styled-components";
import { NavLink, BrowserRouter } from "react-router-dom";

const Nav = styled.nav`
height: 85px,
display: flex`;

const NavSelect = styled(NavLink)`
padding: 20px,
&:hover {
    color: red,
    background:blue
}
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/auth/login">Login</NavLink>
      <NavLink to="/auth/register">Register</NavLink>
    </Nav>
  );
};

export default Navbar;
