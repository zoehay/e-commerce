import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

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

const NavButton = styled.button`
  width: 50px;
  background-color: lightgoldenrodyellow;

  &:hover {
    color: black;
  }
`;

const RequireAuth = () => {
  const context = useContext(UserContext);
  const user = context.user;
  console.log(context);
  if (!user) {
    return <NavSelect to="/auth/login">Login</NavSelect>;
  } else {
    return <NavButton onClick={context.logout}>Logout{user.name}</NavButton>;
  }
};

const Navbar = (user) => {
  return (
    <Nav>
      <NavMenu>
        <NavSelect to="/products">Products</NavSelect>
        <NavSelect to="/auth/login">Login</NavSelect>
        <RequireAuth>{user}</RequireAuth>
        <NavSelect to="/auth/register">Register</NavSelect>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
