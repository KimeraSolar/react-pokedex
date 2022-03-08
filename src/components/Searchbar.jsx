import React, { useState } from 'react';
import styled from 'styled-components';

import { searchPokemon } from '../api';
import Pokemon from './Pokemon';

const SearchbarContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 20px;
  align-items: center;
`;

const InputWrapper = styled.div`
  background-color: white;
  margin-right: 20px;
`;

const Input = styled.input`
  padding: 10px;
  box-shadow: 0px 2px 2px (0, 0, 0, 0.25);
  border-radius: 3px;
  border: none;
`;

const Button = styled.button`
  background-color: #0e6f9f;
  border: none;
  border-radius: 10px;
  height: 44px;
  color: white;
  padding: 10px 12px;
`;

const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSearchHandler = async () => {
    const result = await searchPokemon(search);
    setPokemon(result);
  };

  return (
    <SearchbarContainer>
      <InputWrapper>
        <Input
          placeholder="Buscar pokémon"
          onChange={onChangeHandler}
          value={search}
        />
      </InputWrapper>
      <div>
        <Button onClick={onSearchHandler}>Buscar</Button>
      </div>

      {pokemon && (
        <Pokemon
          id={pokemon.id}
          name={pokemon.name}
          types={pokemon.types}
          image={pokemon.sprites.front_default}
        />
      )}
    </SearchbarContainer>
  );
};

export default Searchbar;
