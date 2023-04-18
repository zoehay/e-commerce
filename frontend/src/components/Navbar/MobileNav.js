import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { NavSelect, NavButton } from "./Navbar";
const MobileNavWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 5rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  left: ${(props) => (props.displayMenu ? "0" : "-100%")};
  transition: left 0.5s ease;
`;

const MobileDropdown = styled.div`
  position: absolute;
  background-color: var(--accent-light-1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  box-shadow: 0.5rem 0.5rem 0.7rem var(--accent-bold-1);
  left: ${(props) => (props.displayMenu ? "0" : "-100%")};
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

const MobileNavDropdown = ({ displayMenu, handleClose }) => {
  return (
    <MobileNavWrapper displayMenu={displayMenu} onClick={handleClose}>
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

  const handleClose = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <NavButton onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={icon} />
      </NavButton>
      <MobileNavDropdown displayMenu={showMenu} handleClose={handleClose} />
    </>
  );
};
