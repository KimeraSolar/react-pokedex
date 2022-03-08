import React from 'react';

const FavoritedContext = React.createContext({
  favoritedPokemons: [],
  updateFavoritedPokemons: () => null,
});

export const FavoritedProvider = FavoritedContext.Provider;

export default FavoritedContext;
