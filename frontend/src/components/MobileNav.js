import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavButton, NavSelect } from "./Navbar";

const MobileNavWrapper = styled.div`
  position: absolute;
  top: 5rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const MobileDropdown = styled.div`
  position: absolute;
  background-color: var(--accent-light-1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  left: ${(props) => (props.displayMenu ? "0" : "-100%")};
  box-shadow: 0.5rem 0.5rem 0.7rem var(--accent-bold-1);
  transition: left 0.5s ease;
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
  line-height: 3rem;
  font-weight: bold;
`;

const MobileNavDropdown = ({ displayMenu }) => {
  return (
    <MobileNavWrapper>
      <MobileDropdown displayMenu={displayMenu}>
        <MobileNavList>
          <li>
            <NavSelect to="/">Home</NavSelect>
          </li>
          <li>
            <NavSelect to="/products">Shop</NavSelect>
          </li>
        </MobileNavList>
      </MobileDropdown>
    </MobileNavWrapper>
  );
};

export const MobileNav = () => {
  let [showMenu, setShowMenu] = useState(false);
  let icon;

  if (!showMenu) {
    icon = faBars;
  } else {
    icon = faX;
  }

  return (
    <>
      <NavButton onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={icon} />
      </NavButton>
      <MobileNavDropdown displayMenu={showMenu} />
    </>
  );
};
