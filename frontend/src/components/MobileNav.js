import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { NavButton, NavSelect } from "./Navbar";

const MobileNavWrapper = styled.div`
  position: absolute;
  top: 5rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  @media (min-width: 46rem) {
    max-width: 75rem;
    justify-content: space-between;
  }
`;

const MobileDropdown = styled.div`
  background-color: var(--accent-light-1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  box-shadow: 0.5rem 0.5rem 0.7rem var(--accent-bold-1);

  @media (min-width: 46rem) {
    width: 33%;
  }
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

const MobileNavDropdown = () => {
  return (
    <MobileNavWrapper>
      <MobileDropdown>
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

  const handleMobileMenu = (showMenu) => {
    setShowMenu(!showMenu);
  };

  if (showMenu === false) {
    return (
      <NavButton onClick={() => setShowMenu(true)}>
        <FontAwesomeIcon icon={faBars} />
      </NavButton>
    );
  } else {
    return (
      <>
        <NavButton onClick={() => setShowMenu(false)}>
          <FontAwesomeIcon icon={faX} />
        </NavButton>
        <MobileNavDropdown />
      </>
    );
  }
};
