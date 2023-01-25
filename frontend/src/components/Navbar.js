import React, { useContext } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  justify-content: space-between;
  width: 100%;
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
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
  width: 100px;
  background-color: thistle;
  border-radius: 5px;
  color: aquamarine;
  height: 60%;

  &:hover {
    color: black;
    background-color: lavenderblush;
  }
`;

const UserOptions = () => {
  const context = useContext(UserContext);
  const user = context.user;
  const navigate = useNavigate();

  if (!user) {
    return (
      <NavDiv>
        <NavSelect to="/auth/login">Login</NavSelect>
        <NavSelect to="/auth/register">Register</NavSelect>
      </NavDiv>
    );
  } else {
    return (
      <NavDiv>
        <NavSelect to="/cart">Cart</NavSelect>
        <NavSelect to="/user">User Profile</NavSelect>
        <NavButton
          onClick={() => {
            context.logout();
            navigate("/");
          }}
        >
          Log Out
        </NavButton>
      </NavDiv>
    );
  }
};

const Navbar = () => {
  return (
    <Nav>
      <NavMenu>
        <NavDiv>
          <NavSelect to="/">Home</NavSelect>
          <NavSelect to="/products">Products</NavSelect>
        </NavDiv>
        <UserOptions></UserOptions>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
