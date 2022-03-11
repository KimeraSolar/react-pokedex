export const fetchPokemon = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
};

export const searchPokemon = async (pokemon) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return await fetchPokemon(url);
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getPokemons = async ({ offset = 0, limit = 50 }) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${
      limit * offset
    }`;
    return await fetchPokemon(url);
  } catch (error) {
    console.log('Error:', error);
  }
};
