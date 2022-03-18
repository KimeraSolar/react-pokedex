import './App.css';

import React, { useEffect, useState } from 'react';

import { FavoritedProvider } from './contexts/favoritedContext';

import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const favoritedKey = 'favoritedPokemon';

function App() {
  const [favorited, setFavorited] = useState([]);

  const loadFavoritedPokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritedKey));
    if (pokemons) setFavorited(pokemons);
  };

  useEffect(() => {
    loadFavoritedPokemons();
  }, []);

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
      <Outlet />
    </FavoritedProvider>
  );
}

export default App;
