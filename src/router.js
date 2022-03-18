import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Pokedex from './components/Pokedex';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/dex" element={<Pokedex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
