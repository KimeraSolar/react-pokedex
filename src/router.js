import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/dex" element={<Pokedex />} />
          <Route path="/pokemon" element={<PokemonDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
