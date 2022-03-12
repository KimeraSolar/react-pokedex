import './App.css';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getPokemons, searchPokemon } from './api';
import { FavoritedProvider } from './contexts/favoritedContext';

import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import Pagination from './components/Pagination';

const favoritedKey = 'favoritedPokemon';

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorited, setFavorited] = useState([]);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState('');

  const itemsPerPage = 30;

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

  const onSearchHandler = async (pokemon, newSearch) => {
    if (!pokemon) {
      setSearching(false);
      return await fetchPokemon({ offset: page - 1, limit: itemsPerPage });
    }

    setLoading(true);
    setSearching(true);

    if (newSearch) {
      setPage(1);
    }

    const result = await searchPokemon({
      pokemon,
      offset: page - 1,
      limit: itemsPerPage,
    });
    const normalizedPokemon = normalizePokemons(result.results);
    setPokemons(normalizedPokemon);
    setTotalPages(Math.ceil(result.count / itemsPerPage));
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const loadFavoritedPokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritedKey));
    if (pokemons) setFavorited(pokemons);
  };

  const fetchPokemon = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getPokemons(params);
      const normalizedPokemons = normalizePokemons(response.results);
      setPokemons(normalizedPokemons);
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.log('fetchPokemon error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavoritedPokemons();
  }, []);

  useEffect(() => {
    if (!searching) fetchPokemon({ offset: page - 1, limit: itemsPerPage });
    else onSearchHandler(search, false);
  }, [page]);

  useEffect(() => {}, [pokemons]);

  const updateFavoritedPokemons = (name) => {
    const updatedFavorites = [...favorited];
    const favoritedIndex = updatedFavorites.indexOf(name);
    if (favoritedIndex >= 0) {
      updatedFavorites.splice(favoritedIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritedKey, JSON.stringify(updatedFavorites));
    setFavorited(updatedFavorites);
  };

  return (
    <FavoritedProvider
      value={{
        favoritedPokemons: favorited,
        updateFavoritedPokemons: updateFavoritedPokemons,
      }}
    >
      <Navbar />
      <TopBar>
        <Searchbar
          search={search}
          setSearch={setSearch}
          onSearch={onSearchHandler}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </TopBar>
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </FavoritedProvider>
  );
}

export default App;
