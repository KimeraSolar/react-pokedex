import React from 'react';
import styled from 'styled-components';

import Pokemon from './Pokemon';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Grid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Pokedex = ({ pokemons, loading }) => {
  return (
    <div>
      <Header>
        <h1>Pokedex</h1>
        <div>Paginação:</div>
      </Header>
      {loading && <div>Carregando, segura fera...</div>}
      {!loading && (
        <Grid>
          {pokemons.map((pokemon, index) => {
            const { id, name, image, types } = pokemon;
            return (
              <Pokemon
                key={index}
                id={id}
                name={name}
                types={types}
                image={image}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Pokedex;
