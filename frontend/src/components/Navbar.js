import React, { useContext } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../util/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

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
  justify-content: space-between;
  width: 100%;
  @media (min-width: 46rem) {
    max-width: 75rem;
  }
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
`;

const NavSelect = styled(NavLink)`
  color: #f4f1bb;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  text-decoration: none;
  &:hover {
    color: #ed6a5a;
  }
`;

const NavButton = styled.button`
  margin: 0 1rem;
  color: var(--accent-light-2);
  background-color: transparent;
  border: none;
  &:hover {
    color: var(--accent-bold-2);
  }
`;

const NavLogo = styled(NavSelect)`
  font-size: 2rem;
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

const Navbar = () => {
  return (
    <Nav>
      <NavBackground>
        <NavMenu>
          <NavDiv>
            <NavSelect to="/">Home</NavSelect>
            <NavSelect to="/products">Shop</NavSelect>
          </NavDiv>
          <NavLogo to="/">The Store</NavLogo>
          <UserOptions></UserOptions>
        </NavMenu>
      </NavBackground>
    </Nav>
  );
};

export default Navbar;
