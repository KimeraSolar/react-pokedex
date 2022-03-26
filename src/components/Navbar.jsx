import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FavoritedContext from '../contexts/favoritedContext';
import FavoritedButton from './FavoritedButton';
import Searchbar from './Searchbar';

const Nav = styled.nav`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NavbarImg = styled.img`
  width: 160px;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const { favoritedPokemons } = useContext(FavoritedContext);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const logoImg =
    'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

  const onSearchHandler = (search) => {
    if (search) {
      navigate(`/dex?search=${search}&page=1`);
    } else {
      navigate(`/dex?page=1`);
    }
  };

  const onFavoritesHandler = () => {
    setSearch('');
    navigate('/dex?showFavorites=true&page=1');
  };

  const onHomeHandler = () => {
    navigate('/dex?page=1');
  };

  useEffect(() => {
    if (!search) navigate('/dex?page=1');
  }, []);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) setSearch(search);
    else setSearch('');
  }, [searchParams]);

  return (
    <Nav>
      <div>
        <NavbarImg
          alt="pokeapi-logo"
          src={logoImg}
          className="navbar-img"
          onClick={onHomeHandler}
        />
      </div>
      <Searchbar
        search={search}
        setSearch={setSearch}
        onSearch={onSearchHandler}
      />
      <FavoritedButton isFavorited={true} onClick={onFavoritesHandler}>
        {favoritedPokemons.length} &#9829;
      </FavoritedButton>
    </Nav>
  );
};

export default Navbar;
