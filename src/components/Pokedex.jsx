import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPokemons, searchPokemon } from '../api';

import Pokemon from './Pokemon';
import Pagination from './Pagination';

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

const NotFound = styled.div`
  text-align: center;
  font-size: 1.25rem;
  padding: 20px;
`;

const Pokedex = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 30;
  const page = parseInt(searchParams.get('page'));

  const normalizePokemons = (pokemonArray) => {
    return pokemonArray.map((pokemon) => {
      const { id, species, types, sprites } = pokemon;
      return {
        id,
        name: species.name,
        types,
        image: sprites.front_default,
      };
    });
  };

  const fetchPokemons = async (offset, limit) => {
    setLoading(true);
    try {
      const response = await getPokemons({ offset, limit });
      const normalizedPokemons = normalizePokemons(response.results);
      setPokemons(normalizedPokemons);
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.log('fetchPokemon error:', error);
    } finally {
      setLoading(false);
    }
  };

  const findPokemon = async (pokemon, offset, limit) => {
    setLoading(true);
    try {
      const response = await searchPokemon({ pokemon, offset, limit });
      const normalizedPokemons = normalizePokemons(response.results);
      setPokemons(normalizedPokemons);
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.log('findPokemon error:', error);
    } finally {
      setLoading(false);
    }
  };

  const showPokemons = async () => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    if (!page) return;
    if (search) {
      findPokemon(search, page - 1, itemsPerPage);
    } else {
      fetchPokemons(page - 1, itemsPerPage);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    showPokemons();
  }, [searchParams]);

  return (
    <div>
      <Header>
        <h1>Pokedex</h1>
      </Header>
      {loading && <div>Carregando, segura fera...</div>}
      {!loading && !pokemons.length && (
        <NotFound>Nada pra ver aqui...</NotFound>
      )}
      {!loading && pokemons.length > 0 && (
        <div>
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
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
        </div>
      )}
    </div>
  );
};

export default Pokedex;
