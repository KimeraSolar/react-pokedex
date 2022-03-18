import './App.css';

import React, { useEffect, useState } from 'react';

import { FavoritedProvider } from './contexts/favoritedContext';

import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const favoritedKey = 'favoritedPokemon';

function App() {
  const [favorited, setFavorited] = useState([]);

  const loadFavoritedPokemons = () => {
    const pokemons = window.localStorage.getItem(favoritedKey);
    if (pokemons !== null) setFavorited(JSON.parse(pokemons));
    else window.localStorage.setItem(favoritedKey, JSON.stringify([]));
  };

  useEffect(() => {
    loadFavoritedPokemons();
  }, []);

  const updateFavoritedPokemons = (name, id) => {
    const favoritedIndex = favorited.findIndex(
      (pokemon) => pokemon.name === name
    );
    const updatedFavorites = [];
    if (favoritedIndex >= 0) {
      favorited.splice(favoritedIndex, 1);
      updatedFavorites.push(...favorited);
    } else {
      const lessThanFavorites = favorited.filter((pokemon) => pokemon.id < id);
      const greaterThanFavorites = favorited.filter(
        (pokemon) => pokemon.id > id
      );
      updatedFavorites.push(
        ...lessThanFavorites,
        { name, id },
        ...greaterThanFavorites
      );
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
      <Outlet />
    </FavoritedProvider>
  );
}

export default App;
