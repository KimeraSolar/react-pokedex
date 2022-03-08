import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NavbarImg = styled.img`
  width: 160px;
`;

const Navbar = () => {
  const logoImg =
    'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

  return (
    <Nav>
      <div>
        <NavbarImg alt="pokeapi-logo" src={logoImg} className="navbar-img" />
      </div>
    </Nav>
  );
};

export default Navbar;
