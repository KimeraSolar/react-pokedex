import './App.css';

import React, { useEffect, useState } from 'react';

import { getPokemons, searchPokemon } from './api';

import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 30;

  const normalizePokemons = (pokemonArray) => {
    return Promise.all(
      pokemonArray.map(async (pokemon) => {
        const response = await searchPokemon(pokemon.name);
        const { id, name, types, sprites } = response;
        return {
          id,
          name,
          types,
          image: sprites.front_default,
        };
      })
    );
  };

  const fetchPokemon = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getPokemons(params);
      const normalizedPokemons = await normalizePokemons(response.results);
      setPokemons(normalizedPokemons);
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.log('fetchPokemon error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchPokemon({ offset: page - 1, limit: itemsPerPage });
    console.log('page change');
  }, [page]);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
